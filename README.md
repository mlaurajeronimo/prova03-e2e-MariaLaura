# Playwright E2E

## GitHub Actions + SonarCloud

[![Build and Tests](https://github.com/mlaurajeronimo/prova03-e2e-MariaLaura/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/mlaurajeronimo/prova03-e2e-MariaLaura/actions/workflows/node.js.yml)

</br>

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mlaurajeronimo_prova03-e2e-MariaLaura2&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=mlaurajeronimo_prova03-e2e-MariaLaura2)

## Configurando o SonarCloud

1. Acesse [SonarCloud](https://sonarcloud.io/) e entre com sua conta do GitHub.
1. Importe o repositório `mlaurajeronimo/prova03-e2e-MariaLaura`.
1. Confirme que o project key do projeto é `mlaurajeronimo_prova03-e2e-MariaLaura2`.
1. No SonarCloud, gere um token em `My Account > Security`.
1. No GitHub, abra `Settings > Secrets and variables > Actions > New repository secret`.
1. Crie o secret `SONAR_TOKEN` com o token gerado no SonarCloud.
1. Caso use testes com ZeroStep, crie também o secret `ZEROSTEP_TOKEN`.
1. Faça um push na branch `master` e acompanhe a execução em `Actions`.

## Getting Started

In order to execute this project you must follow the steps below:

1. Install [Node JS](https://nodejs.org/) (version >= 22.x)
1. Run `npm i --save-dev` to install all the project dependencies
1. Run `npx playwright install` to install the browsers used by Playwright
1. Run `npm run ci` to execute the entire test suite
1. Run `npm run show-report` to visualize the reports

All execution artifacts can be found in `./artifacts`, if you want to remove these files run `npm run clean`.

## Using ZeroStep AI
</br>

To use the AI ​​feature with ZeroStep, you must create the `zerostep.config.json` file in the root of the project and add your ZeroStep token.

## Project Structure
</br>
<ul>
    <li>Scenarios: Test scenario mapping</li>
    <li>Support: Project structure files
        <ul>
            <li>Elements: Mapping the elements of each screen</li>
            <li>Fixtures: Data configuration files</li>
            <li>Pages: Logic used to perform actions in tests</li>
        </ul>
    </li>
</ul>
