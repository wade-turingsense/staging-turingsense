<?php
/**
 * User: Serge
 * Date: 10.11.2016
 * Time: 9:09
 */

/* lists dir and calls callback on each item within allowed extensions list
 * callback:  function(path, name)
 */
function listFolder($folder, $allowedExts, $callback)
{
    if ($callback == null)
        return;

    $file_parts = array();
    $ext = '';
    $title = '';

    $l = strlen($folder);
    if ($l == 0  || substr($folder, $l-1, 1) != '/')
        $folder .= '/';

    $dir_handle = @opendir('../'.$folder) or die("There is an error with your directory! '$folder'");
    while ($file = readdir($dir_handle))
    {
        if ($file == '.' || $file == '..')
            continue;
        $file_parts = explode('.', $file);
        $ext = strtolower(array_pop($file_parts));
        $name = array_shift($file_parts);
        if (in_array($ext, $allowedExts))
            $callback($folder.$file, $name);
    }

    closedir($dir_handle);

}

// returns path to uploaded file
function uploadFile($fileStruct, $acceptableMimeTypes, $uploadDir, $tpl)
{
    $imageinfo = getimagesize($fileStruct['tmp_name']);
    if (!in_array($imageinfo['mime'], $acceptableMimeTypes)) {
        echo "Sorry, we only accept GIF, jpeg and PNG images\n";
        exit;
    }

    $uploadfile = '../' . $uploadDir . basename($fileStruct['name']);

    if (file_exists($uploadfile)) {
        echo "Warning! File already exists!";
        exit;
    }

    if (!move_uploaded_file($fileStruct['tmp_name'], $uploadfile)) {
        echo "File uploading failed.\n";
        return '';
    }

    echo str_replace("{{FILE_NAME}}", $uploadDir.$fileStruct['name'], $tpl);
    return $uploadfile;
}

function toHtml($str)
{
    $search = array("<", ">", "\"", "'");
    $replace = array("&lt;", "&gt;", "&quot;", "&apos;");

    return str_replace($search, $replace, str_replace("&", "&amp;", (string) $str));
}

