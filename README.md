# Plant-Project
An intelligent plant monitoring platform designed to automate and simplify home gardening. Using a Wi-Fi-enabled sensor device placed in the soil, the system tracks real-time environmental data like moisture levels and sunlight. This information is sent directly to an online web application, which automatically manages a digital plant-care checklist and leverages AI to provide users with clear health updates and personalized care recommendations.

The backend uses Java 21. On macOS, select it before running Maven:

```sh
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
export PATH="$JAVA_HOME/bin:$PATH"
./mvnw clean verify
```

The VS Code workspace uses the Homebrew Java 21 installation at
`/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home`. Adjust the
runtime and terminal paths in `.vscode/settings.json` if yours is elsewhere.
Open a new terminal after changing these settings.

Tests use an isolated H2 database and a placeholder Anthropic key; they do not
require production credentials. Running the application with `./mvnw spring-boot:run`
requires `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, and `ANTHROPIC_API_KEY` in the
environment or a local `.env` file. `DB_URL` should omit the `jdbc:` prefix.
Alternatively, supply `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, and `PGPASSWORD`
for the database, as described below for Railway.

Use `.env.example` as a reference and add the missing entries to your existing
project-root `.env` without replacing your API key. For example, `DB_URL` has the
form `postgresql://localhost:5432/plant_p`; the database must already exist and
be reachable with the supplied username and password.

If startup reports `Unable to determine Dialect without JDBC metadata`, check
the earlier database connection error in the log. A URL of `jdbc:${DB_URL}`
means `DB_URL` was not loaded. Run the backend from the project root so it can
find `.env`. The passing H2 context test does not verify this PostgreSQL connection.

For Railway, deploy the backend from the repository root containing `pom.xml`
and add a PostgreSQL service in the same project. In the **backend service's
Variables tab**, use the Raw Editor to add:

```dotenv
PGHOST=${{Postgres.PGHOST}}
PGPORT=${{Postgres.PGPORT}}
PGDATABASE=${{Postgres.PGDATABASE}}
PGUSER=${{Postgres.PGUSER}}
PGPASSWORD=${{Postgres.PGPASSWORD}}
RAILPACK_JDK_VERSION=21
```

Replace `Postgres` with your actual database service name if different. Also
add your real `ANTHROPIC_API_KEY` to the backend service. With this setup, remove
any old `DB_URL`, `DB_USERNAME`, or `DB_PASSWORD` entries from that service to
avoid conflicting settings. The app constructs a PostgreSQL JDBC URL from the
`PG*` variables; it does not consume Railway's `DATABASE_URL` directly.

Deploy these code changes and apply the variable changes. The app already
listens on `0.0.0.0` and Railway's `PORT`. Your local `.env` is ignored by Git
and is not uploaded by a GitHub deployment. Running locally still requires
local connection settings; Railway's private hostname is for deployed services.

References: [Railway PostgreSQL connection setup](https://docs.railway.com/databases/postgresql)
and [Railpack Java version configuration](https://railpack.com/languages/java/).
