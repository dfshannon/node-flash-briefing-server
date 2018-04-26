module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        {
            name: 'flash-briefing-api',
            script: './dist/server.js',
            env: {
                COMMON_VARIABLE: 'true'
            },
            env_production: {
                NODE_ENV: 'production'
            },
        }
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: `${process.env.PM2_USER}`,
            host: [{
                host: `${process.env.PM2_HOST}`,
                port: `${process.env.PM2_SSH_PORT}`
            }],
            key: `${process.env.PM2_SSH_KEY}`,
            ref: 'origin/master',
            repo: `${process.env.PM2_REPO}`,
            path: '/var/www/api/flash/production',
            'post-deploy': 'npm install && npm run buildProdServer && pm2 reload ecosystem.config.js --env production',
            ssh_options: 'StrictHostKeyChecking=no'
        }
    }
};
