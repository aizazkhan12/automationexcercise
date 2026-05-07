pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.57.0-jammy'
            args '-u root:root'
        }
    }

    options {
        timeout(time: 60, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        ansiColor('xterm')
        timestamps()
    }

    environment {
        CI = 'true'
        HOME = "${env.WORKSPACE}"
        PLAYWRIGHT_JUNIT_OUTPUT_NAME = 'test-results/junit.xml'
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
            description: 'Optional test title pattern (passed to --grep)'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci || npm install'
            }
        }

        stage('Run Playwright tests') {
            steps {
                script {
                    def projectFlag = params.BROWSER == 'all' ? '' : "--project=${params.BROWSER}"
                    def grepFlag = params.GREP?.trim() ? "--grep \"${params.GREP}\"" : ''
                    sh "npx playwright test ${projectFlag} ${grepFlag} --reporter=html,junit,list"
                }
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: 'test-results/junit.xml'

            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true, fingerprint: true
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true

            publishHTML(target: [
                reportName: 'Playwright HTML Report',
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: true
            ])
        }
        success {
            echo 'All Playwright tests passed.'
        }
        failure {
            echo 'Playwright tests failed. Check the HTML report and traces.'
        }
    }
}
