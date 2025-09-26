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
    server = {
      exec = "pnpm dev";
      process-compose = {
        depends_on.mysql.condition = "process_healthy";
        readiness_probe = {
          exec.command = "curl -s -o /dev/null -w \"%{http_code} %{content_type}\" http://localhost:3000 | grep \"200 text/html\"";
          initial_delay_seconds = 2;
          period_seconds = 10;
          success_threshold = 1;
          failure_threshold = 5;
        };
      };
    };

    mysql.process-compose.readiness_probe = {
      exec.command = "${config.services.mysql.package}/bin/mysqladmin ping -u root";
      initial_delay_seconds = 2;
      period_seconds = 10;
      success_threshold = 1;
      failure_threshold = 5;
    };
  };

  tasks = {
    "pnpm:install" = {
      exec = "pnpm install --frozen-lockfile";
      before = [ "devenv:enterShell" ];
    };

    "db:migrations:up" = {
      exec = "pnpm mikro-orm-esm migration:up";
      before = [ "devenv:processes:server" ];
    };
  };

  enterTest = "
    wait_for_port 3000
    curl -s -o /dev/null -w \"%{http_code} %{content_type}\" http://localhost:3000 | grep \"200 text/html\"
  ";
}
