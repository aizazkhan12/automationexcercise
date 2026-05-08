pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    options {
        timeout(time: 60, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }

    environment {
        CI = 'true'
        PLAYWRIGHT_JUNIT_OUTPUT_NAME = 'test-results/junit.xml'
        PLAYWRIGHT_HTML_REPORT = 'playwright-report'
    }

    parameters {
        choice(
            name: 'BROWSER',
            choices: ['all', 'chromium', 'firefox', 'webkit'],
            description: 'Which Playwright project to run'
        )
        string(
            name: 'GREP',
            defaultValue: '',
            description: 'Optional test title pattern passed to grep'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Node and npm') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci || npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    def projectFlag = params.BROWSER == 'all' ? '' : "--project=${params.BROWSER}"
                    def grepFlag = params.GREP?.trim() ? "--grep \"${params.GREP}\"" : ''

                    bat """
                    if not exist test-results mkdir test-results
                    if not exist playwright-report mkdir playwright-report

                    npx playwright test ${projectFlag} ${grepFlag} --reporter=list,html,junit
                    """
                }
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])

            junit allowEmptyResults: true, testResults: 'test-results/junit.xml'
        }

        success {
            withCredentials([string(credentialsId: 'SLACK_WEBHOOK_URL', variable: 'SLACK_WEBHOOK')]) {
                bat '''
                curl -X POST -H "Content-type: application/json" ^
                --data "{\\"text\\":\\"Jenkins Build SUCCESS\\nProject: Playwright Automation\\nStatus: Tests Passed\\"}" ^
                %SLACK_WEBHOOK%
                '''
            }
        }

        failure {
            withCredentials([string(credentialsId: 'SLACK_WEBHOOK_URL', variable: 'SLACK_WEBHOOK')]) {
                bat '''
                curl -X POST -H "Content-type: application/json" ^
                --data "{\\"text\\":\\"Jenkins Build FAILED\\nProject: Playwright Automation\\nAction Required: Check Jenkins Console Output\\"}" ^
                %SLACK_WEBHOOK%
                '''
            }
        }
    }
}