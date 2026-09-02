FROM php:8.3-fpm-alpine

# Install production PHP extensions for CodeIgniter 4 and MySQL
RUN apk update && apk add --no-cache \
    icu-dev \
    libzip-dev \
    libpng-dev \
    oniguruma-dev \
    sqlite-dev \
    curl \
    git \
    unzip \
    && docker-php-ext-install \
    intl \
    pdo \
    pdo_mysql \
    pdo_sqlite \
    mysqli \
    mbstring \
    gd \
    zip \
    opcache

# Recommended production PHP settings
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
    && echo "memory_limit = 256M" >> "$PHP_INI_DIR/conf.d/custom.ini" \
    && echo "upload_max_filesize = 32M" >> "$PHP_INI_DIR/conf.d/custom.ini" \
    && echo "post_max_size = 32M" >> "$PHP_INI_DIR/conf.d/custom.ini" \
    && echo "opcache.enable=1" >> "$PHP_INI_DIR/conf.d/custom.ini" \
    && echo "opcache.memory_consumption=128" >> "$PHP_INI_DIR/conf.d/custom.ini"

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . /var/www/html

# Ensure write permissions for cache, sessions, logs, and document blob store
RUN chown -R www-data:www-data /var/www/html/writable \
    && chmod -R 775 /var/www/html/writable

EXPOSE 9000
CMD ["php-fpm"]
