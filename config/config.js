/**
 * Created by Vittorio on 10/05/2016.
 * teste
 */

var nEnv = (process.env.NODE_env === 'development' ? process.env.NODE_env : 'production');
// nEnv = 'production';
nEnv = 'development';
module.exports = require(`./env/${nEnv}.js`);