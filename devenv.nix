# Debenv configuration
# See full reference at https://devenv.sh/reference/options/

{
  pkgs,
  config,
  lib,
  ...
}:
{
  cachix.enable = false;

  packages = with pkgs; [
    docker
    nixd
    nixfmt-rfc-style
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
        "pinage404.nix-extension-pack"
        "bradlc.vscode-tailwindcss"
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
    package = pkgs.nodejs_24;
    corepack.enable = true;
  };

  services.mysql = {
    enable = true;
    settings.mysqld = {
      port = lib.toInt config.env.DB_PORT;
      bind_address = "127.0.0.1";
    };

    initialDatabases = [ { name = config.env.DB_NAME; } ];

    ensureUsers = [
      {
        name = config.env.DB_USER;
        password = config.env.DB_PASSWORD; # FIXME: Devenv ignores this on v1.3 for some reason
        ensurePermissions = {
          "${config.env.DB_NAME}.*" = "ALL PRIVILEGES";
        };
      }
    ];
  };

  processes = {
    server.exec = "pnpm dev";
  };

  enterTest = "
    wait_for_port 3000
    curl -s -o /dev/null -w \"%{http_code} %{content_type}\" http://localhost:3000 | grep \"200 text/html\"
  ";

  # Install dependencies when shell is activated
  enterShell = ''
    pnpm i --frozen-lockfile
  '';
}
