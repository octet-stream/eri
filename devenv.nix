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

  dotenv = {
    enable = true;
    filename = [
      ".env.development.local"
      ".env.local"
    ];
  };

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_22;
    corepack.enable = true;
  };

  services.mysql = {
    enable = true;
    settings.mysqld.port = lib.toInt config.env.DB_PORT;
    initialDatabases = [ { name = config.env.DB_NAME; } ];
    ensureUsers = [
      {
        name = config.env.DB_USER;
        password = config.env.DB_PASSWORD; # FIXME: Devenv ignores this on v1.3 for some reason
        ensurePermissions = {
          "${config.env.DB_USER}.*" = "ALL PRIVILEGES";
        };
      }
    ];
  };

  # Install dependencies when shell is activated
  enterShell = ''
    pnpm i --frozen-lockfile
  '';

  # https://devenv.sh/tests/
  # enterTest = ''
  #   echo "Running tests"
  #   git --version | grep --color=auto "${pkgs.git.version}"
  # '';
}
