# vue-currency-interface

## Project setup
```
npm install
```
then install this app https://github.com/ShoeRiderr/CurrencyInterface.git and follow all steps from doc except php artisan serve command.

Instead of this create virtual host in apache2. In Ubuntu it will be /etc/apache2/sites-enabled/000-default.conf (or your newly created .conf file) path.

in here paste this code:

```
<VirtualHost *:80>
    ServerName currency-interface.local
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html/CurrencyInterface/public
    <Directory /var/www/html/CurrencyInterface>
        DirectoryIndex index.php
        AllowOverride All
        Require all granted
        Order allow,deny
        Allow from all
    </Directory>
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Then go to /etc/hosts and paste this: 
```
 127.0.0.1  currency-interface.local
 127.0.0.1  app.currency-interface.local
```
Next in CurrencyInterface Laravel app in .env fila paste this:
```
SESSION_DOMAIN=.currency-interface.local
SANCTUM_STATEFUL_DOMAINS=app.currency-interface.local:8080
```

Now go to the next step, start the application.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
