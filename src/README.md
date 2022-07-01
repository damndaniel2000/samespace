### > Features Integrated

- Loading animations and no results found screens.
- Music plays as expected even if the categories are changed.
- The previousSong and nextSong button function properly. Even if the categories are changed, it will go to the next or previous song in the same playlist as the existing one. This even accounts for new searches made.
- The volume icon onClick allows us to control the volume of the audio.
- The background gradient changes according to the song's cover art. You may notice this feature not working on certain songs. This is due to a CORS error on the website hosting the image and the same can be verified from the console of the browser.
- Once the song ends, it goes to the next one in the list and if the list has only one song, it pauses after the end of that one.
- The progress bar is set according to the duration of the song and allows the functionality of seeking to certain parts of the song.
- The mobile design is made taking inspiration directly from the Spotify mobile app.

### > Code

- I have divided the code into three sections just like the Figma file - Navigation,Sidebar and Player.
- I have used the ContextAPI to pass states throughout the application.
- Material UI has been used for certain animations and click effects.
- GraphQL's apollo client has been used to integrate GraphQl queries. Kindly overlook general coding practices in the GraphQL bits as I have not worked with it before and this happens to be my first time.
