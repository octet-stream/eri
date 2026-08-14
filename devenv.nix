# Debenv configuration
# See full reference at https://devenv.sh/reference/options/

{
  pkgs,
  config,
  lib,
  ...
}:
let
  isStringHasValue = value: builtins.isString value && value != "";

  isRemoteLibsqlConnection =
    value: if isStringHasValue value then lib.hasPrefix "libsql://" value else false;

  getLibsqlPort =
    value:
    let
      parts =
        if isRemoteLibsqlConnection value then builtins.match ".*://[^/:]+(:([0-9]+))?.*" value else null;

      portString = if parts == null then null else builtins.elemAt parts 1;

      port = if isStringHasValue portString then lib.toInt portString else 8080;
    in
    port;
in
{
  cachix.enable = false;

  packages = with pkgs; [
    docker
    nixd
    nixfmt
    curl
    corepack
  ];

  devcontainer = {
    enable = true;
    settings = {
      image = "ghcr.io/cachix/devenv:v1.4";
      updateContentCommand = "devenv test -v";

      containerEnv = {
        COREPACK_ENABLE_DOWNLOAD_PROMPT = "0";
      };

      customizations.vscode.extensions = [
        "biomejs.biome"
        "editorconfig.editorconfig"
        "github.vscode-github-actions"
        "redhat.vscode-yaml"
        "jnoortheen.nix-ide"
        "bradlc.vscode-tailwindcss"
        "yoavbls.pretty-ts-errors"
        "orta.vscode-twoslash-queries"
      ];
    };
  };

  dotenv = {
    enable = true;
    filename = [
      ".env.development.local"
      ".env.local"
    ];
  };

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs-slim_26;
  };

  services = {
    caddy = {
      enable = true;
      email = config.env.DEVENV_CADDY_EMAIL;
      virtualHosts = {
        "eri.localhost" = {
          serverAliases = [ "www.eri.localhost" ];
          extraConfig = ''
            reverse_proxy localhost:3000
          '';
        };

        "sqld.eri.localhost" = {
          serverAliases = [ "www.sqld.eri.localhost" ];
          extraConfig =
            let
              inherit (config.services.sqld) port;
            in
            ''
              reverse_proxy localhost:${toString port}
            '';
        };
      };
    };

    sqld =
      let
        inherit (config.env) LIBSQL_DB_URL LIBSQL_DB_NAME;

        connectionString = if isStringHasValue LIBSQL_DB_URL then LIBSQL_DB_URL else LIBSQL_DB_NAME;

        enable = isRemoteLibsqlConnection connectionString;
        port = getLibsqlPort connectionString;
        extraArgs = [
          "-d"
          ".databases/sqld/eri"
        ];
      in
      lib.mkIf enable {
        inherit enable port extraArgs;
      };
  };

  process.manager.implementation = "process-compose";

  processes = {
    server = {
      exec = "${pkgs.corepack}/bin/pnpm dev";
      process-compose = {
        depends_on.sqld.condition = "process_healthy";
        readiness_probe = {
          exec.command = "${pkgs.curl}/bin/curl -sf http://localhost:3000/health";
          initial_delay_seconds = 2;
          period_seconds = 10;
          success_threshold = 1;
          failure_threshold = 5;
        };
      };
    };
  };

  tasks = {
    "pnpm:install" = {
      exec = "${pkgs.corepack}/bin/pnpm install --frozen-lockfile";
      before = [ "devenv:enterShell" ];
    };

    "db:migrations:up" = {
      exec = "${pkgs.corepack}/bin/pnpm mikro-orm migration:up";
      before = [ "devenv:processes:server" ];
    };
  };

  enterTest = "
    wait_for_port 3000
    curl -sf http://localhost:3000/health
  ";
}
