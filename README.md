mt-console
===========

A platform independent console application for [mt-downloader](https://github.com/tusharmath/Multi-threaded-downloader). This app is only an abstraction of what the original library can do. To get a complete list of features you should see [mt-downloader](https://github.com/tusharmath/Multi-threaded-downloader)

#Installation

Install this globally using the conventional npm installation command.

```bash
$ npm install -g mt-console
```

#Usage

1. You can get started by using the ```--help``` option. This lists out all the possible operations in mtd.

	```bash
	$ mtd --help
	```

2. To start a new download you will have to provide a ```--url``` and a download ```--file``` path.

	```bash
	$ mtd --url="http://path/to/file.zip" --file="/Downloads/file.zip"
	```

	**NOTE:** Make sure you use the double quotes, some times if you have spaces in your paths it creates problems.
	
3. To resume an old download, you just need to provide the path to the file with .mtd extension that is temporarily created at the time of download.
	
	```bash
	$ mtd --file="/Downloads/file.zip.mtd"
	```

4. You can also pass custom options such as -

	  a. **--count**
	  
		  To set a custom number of download threads. It defaults to what is set in the [mt-downloader](https://github.com/tusharmath/Multi-threaded-downloader) library which is **2**.

	  
	  b. **--range**
	  
		  You can specify a custom download range. This feature is particularly useful when you want to download a part of a video file. Say you just want to download the later half of the file, you can then set the range as **50-100**. Its an optional parameter and defaults to **0-100**.
	  
	  c. **--port**
	  
		  You can specify a custom HTTP port. It defaults to **80**.
	
	  d. **--method**
	  
		  You can specify the download method such as PUT and POST by default it is set to GET.
		  
If you want to know more about this app you can visit [tusharm.com](http://tusharm.com/articles/mt-downloader). Hope this helps you in downloading your data more efficiently! 