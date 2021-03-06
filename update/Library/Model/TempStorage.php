<?php
/**
 * @package ImpressPages
 * @copyright   Copyright (C) 2011 ImpressPages LTD.
 * @license see ip_license.html
 */

namespace IpUpdate\Library\Model;

/**
 * Store data in file system required for update process
 *
 */
class TempStorage
{
    private $scripts;
    private $storageDir;
    
    public function __construct($storageDir)
    {
        if (substr($storageDir, -1) != '/') {
            $storageDir .= '/';
        }
        $this->storageDir = $storageDir;
        
        if (!file_exists($this->storageDir) || !is_dir($this->storageDir)) {
            $fileSystem = new \IpUpdate\Library\Helper\FileSystem();
            $fileSystem->createWritableDir($this->storageDir);
        }
        
        if (!is_writable($this->storageDir)) {
            $errorData = array (
                'file' => $this->storageDir
            );
            throw new \IpUpdate\Library\UpdateException("Can't write directory", \IpUpdate\Library\UpdateException::WRITE_PERMISSION, $errorData);
        }
    }
    
    public function getValue($key)
    {
        if (\file_exists($this->getFileName($key))) {
            return \file_get_contents($this->getFileName($key));
        } else {
            return false;
        }
    }
    
    
    public function setValue($key, $value)
    {
        \file_put_contents($this->getFileName($key), $value);
    }
    
    public function exist($key)
    {
        return file_exists($this->getFileName($key));
    }
    
    public function remove($key)
    {
        if (file_exists($this->getFileName($key))){
            unlink($this->getFileName($key));
        }
    }
    
    private function getFileName($key)
    {
        return $this->storageDir.$key;
    }
    
}