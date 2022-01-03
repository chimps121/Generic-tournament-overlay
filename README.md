# Generic-tournament-overlay
This is a baseline setup that I can use to create overlays for fighting game tournaments. It does not contain graphics, only code. Code can be adapted to different overlay graphics easily.
## How to install
To install this, simply import the html files into your broadcasting software (OBS/XSplit) as browser sources. It is recommended to tick `Shutdown source when not visible` and `Refresh browser when scene becomes active` in the browser source settings (in OBS, XSplit must call it something similar but I don't know what it is).
## How to use the stream package
There are two aspects to using the stream package: the OBS part and the StreamControl part. 

For the OBS part, I will recommend using hotkeys to help make switching between the scenes easier.
These are editable in OBS settings if you need to edit them. Go to Settings->Hotkeys.
Since these are hotkeys and not keyboard shortcuts they always work, so if OBS is not the active window they will still work.

The actual text on the overlays is handled by StreamControl. It's in the sc folder.
Once you open StreamControl.exe, you have access to the Game Cam and Int Cam tabs. Don't go in the "Don't touch this" tab, nothing in it works.

In Game Cam, you can edit P1/P2 Names, Teams and Scores, the round, the two commentators and the timer.
Editing everything except the timer is fairly intuitive.
The timer is awkward. You must click a time, make sure the timer is set to show, then click start timer, then click save and it starts working.
REMEMBER TO CLICK SAVE ONCE YOU HAVE MADE CHANGES TO SAVE THE CHANGES TO SHOW THEM ON THE PAGE.

In Int Cam, you can edit the ticker text that plays down the bottom, as well as the text on the int pages. Edit the text then save using the save button and it should work. Easy clap.
# Acknowledgements
Thanks to BGCallisto for the video tutorials on making stream overlays. I used those to make this.

Thanks to farpnut for StreamControl.

Thanks to MiggL for the layout.xml that I copied to make the top 8 page.
# To-do
- pronoun support
- region support
- game specific overlay support from streamcontrol and the js
