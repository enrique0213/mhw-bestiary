<h1>Title:</h1>
<h2>Monster Hunter World Bestiary</h2>


<br> 
<h1>Description:</h1>

<p>This is a final project for INST377 about the game Monster Hunter Wilds and it is a bestiary for that game. Users can browse monsters, read detailed descriptions and view the statistics of the monster like weaknesses, habitats and rewards using data pulled from the MHW-DB API</p>

<h1>Target Browsers</h1>
<p>Desktop Browsers like Chrome, Firefox, Safari and Edge</p>

<h1>https://mhw-bestiary.vercel.app/</h1>
<p>This is the link to the deployed app.</p>

<nl>

<h1>Developer Module:</h1>
In any directory 
<br>
git clone git@github.com:enrique0213/mhw-bestiary.git

<p>install extension: https://marketplace.visualstudio.com/items/?itemName=ritwickdey.LiveServer in VS code</p>
<p>Run live server to your desktop</p>
<p>No tests are currently being ran</p>
<h2>API Endpoints</h2>
<p>GET /api/monster </p>
<ul>
  <li>Purpose: Retrieves all monsters from the database</li>
  <li>Returns: JSON array of monster objects</li>
</ul>
<p>POST /api/addMonsters</p>
<ul>
  <li>Purpose: Adds a monster to the database</li>
  <li>Returns: New monsters on a card and shows at the bottom of the list</li>
</ul>

<h1>Known Bugs</h1>
<ul>
  <li>Some monsters might not have the full description</li>
</ul>
<h1>Roadmap / Future Updates</h1>
<ul>
  <li>Include armor pieces and weapons</li>
</ul>
