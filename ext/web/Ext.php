<?php

namespace ext;

//require __DIR__ . '/functions.php';

class Ext{

    /**
	 * Constructor
	 */
	public function __construct(){
        //add_action('init', [$this, 'reset_options']);
        add_filter('yy_config', [$this, 'config'], 10);
        add_filter('yy_import_file', [$this, 'import_file'], 10, 2);
        add_action('wp_enqueue_scripts', [$this, 'load_scripts'], 20);
        add_filter('yy_default_values', [$this, 'default_values']);
	}
	
	/**
     * Reset options (Comment it out when it's officially operational)
     */
    public function reset_options(){
        (new Config)->reset();
    }
    
	/**
     * Change theme config
     */
    public function config(){
        return new Config;
    }

	/**
     * Change template file
     */
    public function import_file($file, $name){
        $file = EXT_DIR .'/'. $name . '.php';
        if($name == 'header'){
            $file = EXT_DIR .'/'. $name . '.php';
            /*
            if(is_front_page()){
                $file = EXT_DIR .'/'. $name . '-home.php';
            }
            elseif(is_singular()){
                global $post;
                if($post->post_type == 'product'){
                    $file = EXT_DIR .'/'. $name . '-product.php';
                }
            }*/
        }
        return $file;
    }
    
    /**
     * Load script and style
     */
    public function load_scripts() {
        wp_dequeue_style('yythemes');
        wp_dequeue_script('yythemes');
        wp_enqueue_style('yythemes-ext', EXT_STATIC_URL . '/css/style.css', array(), filemtime(EXT_STATIC_DIR . '/css/style.css'));
    	wp_enqueue_script('yythemes-ext', EXT_STATIC_URL . '/js/script.js', array(), filemtime(EXT_STATIC_DIR . '/js/script.js'));
    }

    /**
     * Filter default values
     */
    public function default_values($defaults){
    
        $defaults = [
            'main_color' => '#FF5E52',
            'dark_color' => '#f13c2f',
            'light_color'=> '#fc938b',
            'link_color' => '#555555',
            'bg_color'   => '#fafafa',
            'fg_color'   => '#333333',
            
            'hf_main_color' => '#FF5E52',
            'hf_dark_color' => '#f13c2f',
            'hf_light_color'=> '#fc938b',
            'hf_link_color' => '#555555',
            'hf_bg_color'   => '#ffffff',
            'hf_fg_color'   => '#333333',
            
            'page_width' => 1200,
            
        ];
        return $defaults;
    }

}
