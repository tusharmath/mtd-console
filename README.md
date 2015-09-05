#mt-console

A platform independent console application for [mt-downloader](https://github.com/tusharmath/Multi-threaded-downloader). This app is only an abstraction of what the original library can do. To get a complete list of features you should see [mt-downloader](https://github.com/tusharmath/Multi-threaded-downloader).

This fork makes the help option work as advertised

##Installation

Install this globally using the conventional npm installation command.

```bash
$ npm install -g mt-console
```

##Usage

- You can get started by using the ```--help``` option. This lists out all the possible operations in mtd.  

    ```bash
     $ mtd --help
    ```

- To start a new download you will have to provide a ```--url``` and a download ```--file``` path.

    ```bash
    $ mtd --url="http://path/to/file.zip" --file="/Downloads/file.zip"
    ```

    **NOTE:** Make sure to use the double quotes to avoid possible problems.

- To resume an old download, you just need to provide the path to the file with .mtd extension that is temporarily created at the time of download.

    ```bash
    $ mtd --file="/Downloads/file.zip.mtd"
    ```

- You can also pass custom options such as:

     ```--count``` : To set a custom number of download threads. It defaults to what is set in the [mt-downloader](https://github.com/tusharmath/Multi-threaded-downloader) library.

     ```--range``` : You can specify a custom download range. This feature is particularly useful when you want to download a part of a video file. Say you just want to download the later half of the file, you can then set the range as **50-100**. Its an optional parameter and defaults to **0-100**.

     ```--port``` : You can specify a custom HTTP port. It defaults to **80**.

     ```--method``` : You can specify the download method such as **PUT** and **POST** by default it is set to **GET**.

     ```--wd``` : Shows the current working directory. You can update this using ```--set-wd``` option.

     ```--set-wd``` : You can set you current working directory using this command. This is particularly helpful if you want to avoid typing the complete download path with the ```--file``` parameter. Instead you can set a common path for downloads and just specify the name of the file. The app will automatically combine the two and create the complete file path.

    ```bash
    $ mtd --set-wd="/Users/user/Downloads/"
    $ Working directory updated to /Users/user/Downloads/

    $ mtd --wd
    Working directory: /Users/user/Downloads/

    $ mtd --url="http://path/to/file_one.zip" --file="file_one.zip"
    $ mtd --url="http://path/to/file_two.zip" --file="file_two.zip"

    ```

    Both the files *file_one.zip* and *file_two.zip* will be downloaded at the same location ```/Users/users/Downloads/``` because that is the default download path.

     ```--clear-wd``` : Clears the saved working directory.

     ```--timeout``` : Sometimes the connections are established but are not transferring any data. Using this setting you can set the maximum amount of time in **seconds** that it should wait before quitting.

     ```--auto-name``` : Generates the file name on its own by parsing the last element of the url. You will not be required to set the ```--file``` parameter while starting a new download. It will also automatically prepend the generated file name with the working directory specified by the ```--set-wd``` option.

     ```--headers``` : You can specify headers by seperating them using semicolons as follows

    ```bash
    $ mtd --url="http://path/to/file_one.zip" --file="file_one.zip" --headers="user-agent:crawl-bot;cookie:abc%3D100%3Bpqr%3D200"
    ```

    **NOTE:** make sure you encode the header values parameters while sending else they might get escaped while parsing.
