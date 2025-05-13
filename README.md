<h1>Title:</h1>
<h2>Monster Hunter World Bestiary</h2>


<br> 
<h1>Description:</h1>

<p>This is a final project for INST377 about the game Monster Hunter Wilds and it is a bestiary for that game. Users can browse monsters, read detailed descriptions and view the statistics of the monster like weaknesses, habitats and rewards using data pulled from the MHW-DB API</p>

<h1>Target Browsers</h1>
<p>Desktop Browsers like Chrome, Firefox, Safari and Edge</p>


<nl>

<h1>Developer Module:</h1>
In any directory 
<br>
git clone git@github.com:enrique0213/mhw-bestiary.git

<p>install https://marketplace.visualstudio.com/items/?itemName=ritwickdey.LiveServer in VS code and run live server to your desktop</p>
<p>No tests are currently being ran</p>
<h2>API Endpoints</h2>
<p>GET /api/monster </p>
<ul>
  <li>Purpose: Retrieves all monsters from the database</li>
  <li>Returns: JSON array of monster objects</li>
<p>POST /api/favorites</p>
