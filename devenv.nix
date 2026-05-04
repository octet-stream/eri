# Debenv configuration
# See full reference at https://devenv.sh/reference/options/

{
  pkgs,
  config,
  ...
}:
{
  cachix.enable = false;

  packages = with pkgs; [
    docker
    nixd
    nixfmt-rfc-style
    curl
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
    package = pkgs.nodejs-slim_24;
    corepack.enable = true;
  };

  services = {
    caddy = {
      enable = true;
      email = config.env.DEVENV_CADDY_EMAIL;
      virtualHosts."eri.localhost" = {
        serverAliases = [ "www.eri.localhost" ];
        extraConfig = ''
          reverse_proxy localhost:3000
        '';
      };
    };
  };

  process.manager.implementation = "process-compose";

  processes = {
    server = {
      exec = "${pkgs.corepack_24}/bin/pnpm dev";
      process-compose = {
        readiness_probe = {
          exec.command = "${pkgs.curl}/bin/curl -sf http://localhost:3000/health";
          initial_delay_seconds = 2;
          period_seconds = 10;
          success_threshold = 1;
          failure_threshold = 5;
        };
      };
    };

    caddy.process-compose.depends_on.server.condition = "process_healthy";
  };

  tasks = {
    "pnpm:install" = {
      exec = "${pkgs.corepack_24}/bin/pnpm install --frozen-lockfile";
      before = [ "devenv:enterShell" ];
    };

    "db:migrations:up" = {
      exec = "${pkgs.corepack_24}/bin/pnpm mikro-orm migration:up";
      before = [ "devenv:processes:server" ];
    };
  };

  enterTest = "
    wait_for_port 3000
    curl -sf http://localhost:3000/health
  ";
}
