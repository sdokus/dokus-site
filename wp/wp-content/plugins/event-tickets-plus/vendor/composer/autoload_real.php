<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInitc28c6d86c3903b4a563dabb9619ba52b
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        require __DIR__ . '/platform_check.php';

        spl_autoload_register(array('ComposerAutoloaderInitc28c6d86c3903b4a563dabb9619ba52b', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInitc28c6d86c3903b4a563dabb9619ba52b', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInitc28c6d86c3903b4a563dabb9619ba52b::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
