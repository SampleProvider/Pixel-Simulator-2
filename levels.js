var currentLevel = null;
// A Pixel World (20x20)
// Gravitational Forces (40x40)
// Mudslide (40x40)
// Under The Bridge (40x40)
// Rafting (40x40)
// Final: Floating Islands (100x100)
var levels = {
    "1-1": {
        //20;1-1;20;0-50:6:0-j:6-2:0-i:5:0-i:3:5:0-i:2-2:9:0-g:90:2:1:9:8:4-b:0-3:2-2:1-3:8-2:4-c:8:2:1-5:8-6:4-3:8-5:1-a:9:8-5:1-1b:1-1;20;1-1;20;0-50:6:0-j:6-2:0-i:5:0-i:3:5:0-i:2-2:9:0-g:90:2:1:9:8:4-b:0-3:2-2:1-3:8-2:4-c:8:2:1-5:8-6:4-3:8-5:1-a:9:8-5:1-1b:0-b4:1-1;20;1-1;20;0-50:6:0-j:6-2:0-i:5:0-i:3:5:0-i:2-2:9:0-g:90:2:1:9:8:4-b:0-3:2-2:1-3:8-2:4-c:8:2:1-5:8-6:4-3:8-5:1-a:9:8-5:1-1b:1-1;20;1-1;20;0-50:6:0-j:6-2:0-i:5:0-i:3:5:0-i:2-2:9:0-g:90:2:1:9:8:4-b:0-3:2-2:1-3:8-2:4-c:8:2:1-5:8-6:4-3:8-5:1-a:9:8-5:1-1b:0-b4:0;b4:
        //1-1;
        saveCode: "20;AIR-50:LEAF:AIR-j:LEAF-2:AIR-i:OAK_WOOD:AIR-i:SAND:OAK_WOOD:AIR-i:GRASS-2:DRIED_MUD:AIR-g:MONSTER:GRASS:DIRT:DRIED_MUD:MUD:WATER-b:AIR-3:GRASS-2:DIRT-3:MUD-2:WATER-c:MUD:GRASS:DIRT-5:MUD-6:WATER-3:MUD-5:DIRT-a:DRIED_MUD:MUD-5:DIRT-1b:AIR-b4:0;b4:",
        pixelInventory: {},
        name: "A Pixel World",
        description: "Welcome to <b>Pixel Simulator 2</b>! <b>Pixel Simulator 2</b> is a puzzle/sandbox game where you can simulate interactions of different <b>pixels</b>. <b>Pixels</b> are placed in a square grid, which you can see on the left side of your screen. Each square of the grid we will call <b>tiles</b>. Even though they are called <b>pixels</b>, a <b>pixel</b> is not actually just 1 solid color, and may be made of many. In levels, the goal is to destroy all the <b>monsters</b> (red <b>pixels</b>). Various methods to do this will be shown in later levels. Don't worry about it now.<br><br>If you get stuck on a level, don't worry, you can skip it. Some levels you may find a lot harder than the previous levels. Levels with a letter instead of a number are <b>bonus levels</b>. These levels take taught mechanics and use them to their full extent, in often challenging to figure out ways. These levels are meant to challenge you.<br><br>The sidebar is on the right side of your screen. The top is the level description, which you are reading right now. Underneath it, is the <b>Pixel Picker</b>. Here, you can see the pixels you have to beat a level. Click on a pixel in the <b>Pixel Picker</b> to select it. Underneath the <b>Pixel Picker</b> is the pixel description, which gives you a description of the pixel, what it does, and various statistics about the pixel, like its <b>density</b>, <b>blast resistance</b>, and how <b>flammable</b> it is. At the very bottom are the control and navigation buttons. These buttons are pretty self-explanatory.<br><br><b>Controls:</b><br><b>Left Click</b>: Place Pixels.<br><b>Right Click</b>: Remove Pixels.<br><b>Middle Click</b>: Pick Pixel. (Selects the pixel underneath the cursor.)<br><b>Scroll</b> or <b>Up/Down Arrows</b>: Change Click Size.<br><b>Ctrl+Scroll</b>: Zoom In/Out<br><b>W-A-S-D</b>: Move Camera.<br><b>Shift/Alt+Click</b>: Select Region. Use <b>Right Click</b> to cancel.<br><b>Ctrl+C</b>: Copy.<br><b>Ctrl+X</b>: Cut.<br><b>Ctrl+V</b>: Paste.<br><b>Q/E</b>: Rotate Selection<br><b>F</b>: Flip Selection<br>Click <b>Run</b> to continue.",
    },
    "1-2": {
        //
        //50;0-1105:90:0-36:6-3:0-10:6-3:0-13:6-3:0-17:6-5:0-8:6-5:0-5:6-3:90:0-2:6-5:0-9:90:0-6:6-2:5:6-2:0-8:6-2:5:6-2:0-4:6-5:0-2:6-5:0-9:6-3:0-5:6:5:6:0-10:6:5:6:0-5:6-2:5:6-2:0-2:6-3:5:0-9:6-5:0-5:5:0-12:5:0-7:6:5:6:0-4:6-2:0:5:0-8:6-2:5:6-2:0-5:5:0-11:5-2:0-8:5:0-8:5:0-9:6:5:6:0-6:5:0-11:5:0-9:5:0-9:5:0-9:5:0-7:5:0-7:90:0-4:5:0-7:5:0-10:5:0-9:5:0-7:2:90:2-14:0-5:5:0-10:5:0-8:5-2:0-2:2-6:1-14:2-5:90:5:0-10:5:90:0-2:2-7:90:2-2:1-23:2-9:90:0-2:2-6:1-40:2-5:1-225:16-5:1-43:16-9:1-31:16-20:1-29:16-28:1-16:16-45:1-2:16-172:17-2:16-47:17-8:16-34:17-20:16-9:17-5:16-12:17-13:0-2500:1;1000:1500:
        saveCode: "50;AIR-vq:LEAF-3:AIR-9:MONSTER:LEAF-3:AIR-d:LEAF-3:AIR-h:LEAF-5:AIR-8:LEAF-5:AIR-5:LEAF-3:MONSTER:AIR-2:LEAF-5:AIR-9:MONSTER:AIR-6:LEAF-2:OAK_WOOD:LEAF-2:AIR-8:LEAF-2:OAK_WOOD:LEAF-2:AIR-4:LEAF-5:AIR-2:LEAF-5:AIR-9:LEAF-3:AIR-5:LEAF:OAK_WOOD:LEAF:AIR-a:LEAF:OAK_WOOD:LEAF:AIR-5:LEAF-2:OAK_WOOD:LEAF-2:AIR-2:LEAF-3:OAK_WOOD:AIR-9:LEAF-5:AIR-5:OAK_WOOD:AIR-c:OAK_WOOD:AIR-7:LEAF:OAK_WOOD:LEAF:AIR-4:LEAF-2:AIR:OAK_WOOD:AIR-8:LEAF-2:OAK_WOOD:LEAF-2:AIR-5:OAK_WOOD:AIR-b:OAK_WOOD-2:AIR-8:OAK_WOOD:AIR-8:OAK_WOOD:AIR-9:LEAF:OAK_WOOD:LEAF:AIR-6:OAK_WOOD:AIR-b:OAK_WOOD:AIR-9:OAK_WOOD:AIR-9:OAK_WOOD:AIR-9:OAK_WOOD:AIR-7:OAK_WOOD:AIR-7:MONSTER:AIR-4:OAK_WOOD:AIR-7:OAK_WOOD:AIR-a:OAK_WOOD:AIR-9:OAK_WOOD:AIR-7:GRASS:MONSTER:GRASS-e:AIR-5:OAK_WOOD:AIR-a:OAK_WOOD:AIR-8:OAK_WOOD-2:AIR-2:GRASS-6:DIRT-e:GRASS-5:MONSTER:OAK_WOOD:AIR-a:OAK_WOOD:MONSTER:AIR-2:GRASS-7:MONSTER:GRASS-2:DIRT-n:GRASS-9:MONSTER:AIR-2:GRASS-6:DIRT-14:GRASS-5:DIRT-69:STONE-5:DIRT-17:STONE-9:DIRT-v:STONE-k:DIRT-t:STONE-s:DIRT-g:STONE-19:DIRT-2:STONE-4s:BASALT-2:STONE-1b:BASALT-8:STONE-y:BASALT-k:STONE-9:BASALT-5:STONE-c:BASALT-d:AIR-1xg:1;vq:3:9:4:d:3:h:10d:",
        pixelInventory: {
            DIRT: 3,
            GRASS: 2,
            SAND: 2,
            WATER: 2,
        },
        name: "Gravitational Forces",
        description: "Most <b>pixels</b> in Pixel Simulator 2 follow gravity. Dirt, sand, and water all will fall downwards, and some are more stable than others. Dirt and grass fall downwards unless there are at least 4 pixels touching them. Sand falls and likes to make hills. Water will always try to reach the lowest elevation.<br><br><b>Placing Pixels</b>: The shaded square is where the pixel will be placed. In sandbox mode, you can place and remove <b>pixels</b> anywhere and also while the simulation is running. In levels, you have a limited amount of <b>pixels</b>, and may not place or remove once the simulation has started. Clicking <b>Reset</b> will reset the simulation back to before it started. In levels, you can only place and remove on the lighter <b>tiles</b>.<br><br><b>Destroying Monsters</b><br><br>If a <b>pixel</b> falls onto a <b>monster</b>, both the falling <b>pixel</b> and the monster get disintegrated. Using the given <b>pixels</b>, place them on the lighter <b>tiles</b> and destroy all the <b>monsters</b> to win!",
    },
    "1-3": {
        //
        //50;0-1118:3-2:0-46:3-5:0-44:3-3:1-4:0-24:3-4:0-13:1-11:0-17:3-9:0-11:1-14:0-14:1-3:3-8:0-11:1-14:0-13:1-8:3-4:0-11:1-14:0-13:1-12:0-12:1-13:0-14:1-11:0-13:1-11:0-14:1-12:0-12:1-11:0-15:1-12:2:0-11:1-11:0-14:1-13:2:8:4-9:8:1-10:0-14:1-15:8-2:4-5:8-4:1-10:0-14:1-16:8-7:1-14:90:0-12:1-38:0:90:0-9:1-41:90:0-2:5-2:0:90-2:0:1-43:5-4:1-218:16-5:1-45:16-11:1-34:16-35:1-14:16-56:17:16-49:17-5:16-44:17-12:16-37:17-2:0-2500:1;1000:1500:
        saveCode: "50;AIR-v2:SAND-2:AIR-1a:SAND-5:AIR-18:SAND-3:DIRT-4:AIR-o:SAND-4:AIR-d:DIRT-b:AIR-h:SAND-9:AIR-b:DIRT-e:AIR-e:DIRT-3:SAND-8:AIR-b:DIRT-e:AIR-d:DIRT-8:SAND-4:AIR-b:DIRT-e:AIR-d:DIRT-c:AIR-c:DIRT-d:AIR-e:DIRT-b:AIR-d:DIRT-b:AIR-e:DIRT-c:AIR-c:DIRT-b:AIR-f:DIRT-c:GRASS:AIR-b:DIRT-b:AIR-e:DIRT-d:GRASS:MUD:WATER-9:MUD:DIRT-a:AIR-e:DIRT-f:MUD-2:WATER-5:MUD-4:DIRT-a:AIR-e:DIRT-g:MUD-7:DIRT-e:MONSTER:AIR-c:DIRT-12:AIR:MONSTER:AIR-9:DIRT-15:MONSTER:AIR-2:OAK_WOOD-2:AIR:MONSTER-2:AIR:DIRT-17:OAK_WOOD-4:DIRT-62:STONE-5:DIRT-19:STONE-b:DIRT-y:STONE-z:DIRT-e:STONE-1k:BASALT:STONE-1d:BASALT-5:STONE-18:BASALT-c:STONE-11:BASALT-2:AIR-1xg:1;v2:2:1a:5:18:7:o:4:d:b:h:9:b:13:b:13:b:13:c:12:d:11:c:13:b:oo:",
        pixelInventory: {
            GRASS: 1,
            WATER: 4,
        },
        name: "Mudslide",
        description: "Oh no! There are tons of <b>monsters</b> and you only have 5 <b>pixels</b>! Don't you just hate when you are given an impossible level? Wait, that dirt cliff doesn't look very stable though... maybe you could turn it into mud...",
    },
    "1-4": {
        saveCode: "50;AIR-71:LEAF-3:AIR-1a:LEAF-5:AIR-19:LEAF-2:OAK_WOOD:LEAF-2:AIR-d:OAK_WOOD:AIR-b:OAK_WOOD:AIR-c:LEAF-3:AIR-5:LEAF:OAK_WOOD:LEAF:AIR-d:OAK_WOOD-3:AIR-9:OAK_WOOD-3:AIR-a:LEAF-5:AIR-5:OAK_WOOD:AIR-d:OAK_WOOD:AIR:OAK_WOOD:AIR:OAK_WOOD:AIR-7:OAK_WOOD:AIR:OAK_WOOD:AIR:OAK_WOOD:AIR-9:LEAF-2:OAK_WOOD:LEAF-2:AIR-4:OAK_WOOD:AIR-d:OAK_WOOD:AIR-2:OAK_WOOD:AIR-2:OAK_WOOD-2:AIR-3:OAK_WOOD-2:AIR-2:OAK_WOOD:AIR-2:OAK_WOOD:AIR-9:LEAF:OAK_WOOD:LEAF:AIR-5:OAK_WOOD:AIR-b:OAK_WOOD-2:AIR-3:OAK_WOOD:AIR-4:OAK_WOOD-3:AIR-4:OAK_WOOD:AIR-3:OAK_WOOD-2:AIR-8:OAK_WOOD:AIR-6:OAK_WOOD:AIR-8:OAK_WOOD-3:AIR-5:OAK_WOOD:AIR-b:OAK_WOOD:AIR-5:OAK_WOOD-3:AIR-5:OAK_WOOD:AIR-3:GRASS-2:AIR:OAK_WOOD:AIR-6:OAK_WOOD-2:AIR-8:OAK_WOOD:AIR-b:OAK_WOOD:AIR-8:OAK_WOOD-2:AIR-4:OAK_WOOD:AIR:GRASS:DIRT:GRASS-8:OAK_WOOD-z:GRASS-6:DIRT-b:AIR-3:OAK_WOOD:AIR-n:OAK_WOOD:AIR-3:DIRT-k:AIR:OAK_WOOD:AIR-p:OAK_WOOD:AIR-2:DIRT-k:OAK_WOOD:AIR-r:OAK_WOOD:DIRT-l:AIR-t:DIRT-l:AIR-t:DIRT-l:AIR-s:DIRT-l:AIR-t:DIRT-l:AIR-t:DIRT-l:AIR-t:DIRT-l:AIR-t:DIRT-l:AIR-u:DIRT-j:AIR-v:DIRT-j:AIR-v:DIRT-i:AIR-w:DIRT-i:AIR-x:DIRT-h:AIR-x:DIRT-h:AIR-y:DIRT-g:AIR-y:DIRT-f:DRIED_MUD:AIR-z:DIRT-e:MUD:AIR-z:MONSTER:DIRT-d:MUD:WATER-z:MUD:DIRT-d:MUD:WATER-z:MUD:DIRT-d:MUD-2:WATER-y:MUD:DIRT-e:MUD-2:WATER-w:MUD-2:DIRT-f:MUD-2:WATER-u:MUD-2:DIRT-6:STONE:DIRT-a:MUD-5:WATER-o:MUD-3:DIRT-7:STONE-2:DIRT-c:DRIED_MUD:MUD-5:WATER-g:MUD-5:DIRT-9:STONE-2:DIRT-f:DRIED_MUD-2:MUD-6:WATER-7:MUD-5:DRIED_MUD-2:DIRT-b:STONE-3:DIRT-i:DRIED_MUD-3:MUD-9:DRIED_MUD-2:DIRT-e:STONE-4:DIRT-19:STONE-6:DIRT-16:STONE-9:DIRT-13:STONE-h:DIRT-t:STONE-a:BASALT:STONE-e:DIRT-m:STONE-b:BASALT-4:STONE-h:DIRT-f:STONE-c:BASALT-4:AIR-1xg:1;71:3:1a:5:19:5:13:2:5:3:12:5:5:1:13:5:4:1:d:4:b:4:9:3:5:1:b:6:b:6:8:1:6:1:8:9:b:9:5:1:3:2:1:1:6:b:b:b:4:1:1:m:b:1d4:",
        pixelInventory: {
            SAND: 9,
            SAPLING: 15,
        },
        name: "Under The Bridge",
        description: "Look at this cool bridge! Oh, it's so high up! I would hate to have to go down there. Wait, is there a <b>monster</b> hiding in that corner? Well, I'm not going down, so I guess it's your job to destroy it.",
    },
    "1-5": {
        saveCode: "50;AIR-1a7:MONSTER:AIR-1c:MONSTER:OAK_WOOD:AIR:MONSTER:AIR-2:OAK_WOOD:MONSTER:AIR-15:OAK_WOOD-a:AIR-t:WATER-b:OAK_WOOD-a:WATER-iv:AIR-1xg:0;p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:p:yq:",
        pixelInventory: {
            DIRT: 4,
            SAND: 17,
            OAK_WOOD: 15,
            SAPLING: 15,
        },
        name: "Rafting",
        description: "The <b>monsters</b> have built a raft and sailed to sea! Try to destroy them while they are still on their raft!",
    },
    "1-6": {
        saveCode: "100;AIR-59:LEAF-3:AIR-2o:LEAF-5:AIR-2:LEAF-3:AIR-2i:LEAF-2:OAK_WOOD:LEAF-2:AIR:LEAF-5:AIR-2i:LEAF:OAK_WOOD:LEAF:AIR-2:LEAF-2:OAK_WOOD:LEAF-2:AIR-2j:OAK_WOOD:AIR-4:LEAF:OAK_WOOD:LEAF:AIR-2k:OAK_WOOD:AIR-5:OAK_WOOD:AIR-1c:LEAF-3:AIR-m:LEAF-3:AIR-g:OAK_WOOD:AIR-6:OAK_WOOD:AIR-1b:LEAF-5:AIR-k:LEAF-5:AIR-f:OAK_WOOD:AIR-6:OAK_WOOD:AIR-1b:LEAF-2:OAK_WOOD:LEAF-2:AIR-k:LEAF-2:OAK_WOOD:LEAF-2:AIR-e:GRASS:DIRT:GRASS-3:AIR-4:OAK_WOOD:AIR-11:LEAF-3:AIR-7:LEAF:OAK_WOOD:LEAF:AIR-m:LEAF:OAK_WOOD:LEAF:AIR-e:GRASS:DIRT-5:GRASS-4:OAK_WOOD:AIR-10:LEAF-5:AIR-7:OAK_WOOD:AIR-o:OAK_WOOD:AIR-f:DIRT-b:GRASS:AIR-z:LEAF-2:OAK_WOOD:LEAF-2:AIR-7:OAK_WOOD:AIR-o:OAK_WOOD:AIR-f:STONE:DIRT-a:STONE:AIR-10:LEAF:OAK_WOOD:LEAF:AIR-7:OAK_WOOD:AIR-q:OAK_WOOD:GRASS-3:AIR-c:STONE:DIRT-8:STONE-2:AIR-11:OAK_WOOD:AIR-8:OAK_WOOD:AIR-o:GRASS-2:DIRT-4:GRASS:AIR-b:STONE-3:DIRT-6:STONE-2:AIR-9:LEAF-3:AIR-p:OAK_WOOD:AIR-8:OAK_WOOD:AIR-n:GRASS:DIRT-7:AIR-c:STONE-3:DIRT-4:STONE-2:AIR-9:LEAF-5:AIR-o:OAK_WOOD:AIR-5:GRASS-3:DIRT:GRASS-2:MONSTER:AIR-k:STONE:DIRT-6:STONE:AIR-d:STONE-3:DIRT:STONE-3:AIR-a:LEAF-2:OAK_WOOD:LEAF-2:AIR-o:OAK_WOOD:MONSTER:GRASS-4:DIRT-6:GRASS-2:AIR-k:STONE-2:DIRT-2:STONE-3:AIR-e:STONE-6:AIR-b:LEAF:OAK_WOOD:LEAF:AIR-m:GRASS-3:DIRT:GRASS:DIRT-c:AIR-l:STONE:DIRT:STONE-3:AIR-f:STONE-6:AIR-c:OAK_WOOD:AIR-m:GRASS:DIRT-g:STONE:AIR-l:STONE-4:AIR-e:STONE:AIR-2:STONE-4:AIR-e:OAK_WOOD:AIR-l:STONE:DIRT-f:STONE-2:AIR-m:STONE-3:AIR-f:STONE:AIR-2:STONE-2:AIR-2:STONE:AIR-c:OAK_WOOD:AIR-l:STONE-2:DIRT-d:STONE-3:AIR-m:STONE-2:AIR-g:STONE:AIR-2:STONE:AIR-2:STONE:AIR-d:OAK_WOOD:AIR-m:STONE-3:DIRT-b:STONE-3:AIR-m:STONE-2:AIR:STONE:AIR-h:STONE:AIR-c:GRASS-4:OAK_WOOD:AIR-m:STONE-5:DIRT-8:STONE-3:AIR-o:STONE:AIR-l:STONE:AIR-8:GRASS-2:DIRT-5:GRASS-3:AIR-k:STONE-6:DIRT-4:STONE-5:AIR-m:STONE:AIR-k:STONE:AIR-b:DIRT-a:AIR-n:STONE-5:DIRT:STONE-5:AIR-18:STONE:AIR-b:STONE-2:DIRT-7:STONE:AIR-o:STONE-9:AIR-1m:STONE-3:DIRT-3:STONE-2:AIR-l:STONE:AIR-4:STONE-6:AIR-1p:STONE-3:DIRT-2:STONE:AIR-n:STONE-2:AIR-3:STONE-4:AIR-2:STONE:AIR-1n:STONE-3:DIRT:STONE-2:AIR-p:STONE:AIR-2:STONE-4:AIR-2:STONE:AIR-1o:STONE-5:AIR-t:STONE-2:AIR-1s:STONE-4:AIR-u:STONE:AIR-2:STONE:AIR-1r:STONE-2:AIR-2:STONE:AIR-s:STONE:AIR-1r:STONE:AIR-2:STONE:AIR-2:STONE:AIR-4:LEAF-3:AIR-c:LEAF-3:AIR-5:STONE:AIR-1w:STONE:AIR-6:LEAF-5:AIR-a:LEAF-5:AIR-8:STONE:AIR-1z:LEAF-2:OAK_WOOD:LEAF-2:AIR-a:LEAF-2:OAK_WOOD:LEAF-2:AIR-l:LEAF-3:AIR-1c:STONE:AIR-8:LEAF:OAK_WOOD:LEAF:AIR-c:LEAF:OAK_WOOD:LEAF:AIR-l:LEAF-5:AIR-1l:OAK_WOOD:AIR-e:OAK_WOOD:AIR-m:LEAF-2:OAK_WOOD:LEAF-2:AIR-1k:OAK_WOOD:AIR-f:OAK_WOOD:AIR-n:LEAF:OAK_WOOD:LEAF:AIR-i:MONSTER:AIR-12:OAK_WOOD:AIR-f:OAK_WOOD:AIR-o:OAK_WOOD:AIR-i:MONSTER-2:AIR:MONSTER:AIR-10:OAK_WOOD:AIR-9:GRASS-4:MONSTER:AIR:OAK_WOOD:AIR-o:OAK_WOOD:AIR-i:SAND:GRASS-3:AIR-10:OAK_WOOD:AIR-2:MONSTER:AIR:GRASS-5:DIRT-4:GRASS-3:AIR-o:OAK_WOOD:AIR-4:GRASS-2:SAND-2:AIR-9:SAND-2:DIRT-3:GRASS:AIR-x:GRASS-7:DIRT-c:GRASS-2:AIR-m:OAK_WOOD:MONSTER:GRASS-3:DIRT-3:SAND:MUD:WATER-7:MUD:SAND:DIRT-5:GRASS-2:AIR-p:GRASS-6:DIRT-l:GRASS-2:AIR-i:GRASS-4:DIRT-7:MUD-2:WATER-5:MUD-2:DIRT-8:GRASS-2:AIR-n:DIRT-t:AIR-f:GRASS-3:DIRT-c:MUD-2:WATER-2:MUD-3:DIRT-b:AIR-n:STONE-3:DIRT-o:STONE-2:AIR-e:GRASS:DIRT-g:MUD-4:DIRT-c:STONE:AIR-n:STONE-4:DIRT-7:STONE-3:DIRT-b:STONE-3:AIR-f:STONE:DIRT-t:STONE-4:AIR-o:STONE-4:DIRT-5:STONE-5:DIRT-8:STONE-5:AIR-f:STONE-3:DIRT-q:STONE-5:AIR-o:STONE-6:DIRT-2:STONE-7:DIRT-6:STONE-5:AIR-h:STONE-5:DIRT-m:STONE-5:AIR-q:STONE-f:DIRT-5:STONE-4:AIR-i:STONE-6:DIRT-l:STONE-5:AIR-r:STONE-8:AIR-2:STONE-4:DIRT-4:STONE-4:AIR-l:STONE-4:DIRT-5:STONE-2:DIRT-d:STONE-5:AIR-t:STONE-6:AIR-3:STONE-4:DIRT-4:STONE-4:AIR-m:STONE-4:DIRT-3:STONE-4:DIRT-6:STONE:DIRT-4:STONE-4:AIR-t:STONE:AIR:STONE-5:AIR-4:STONE-5:DIRT-2:STONE-5:AIR-m:STONE-4:DIRT-2:STONE-6:DIRT-4:STONE-3:DIRT-2:STONE-4:AIR-3:STONE:AIR-q:STONE:AIR-2:STONE-4:AIR:STONE:AIR-3:STONE-4:DIRT:STONE-5:AIR-o:STONE-b:DIRT-3:STONE-5:DIRT:STONE-4:AIR-3:STONE:AIR-r:STONE:AIR-2:STONE-2:AIR-6:STONE-a:AIR-o:STONE-8:AIR:STONE-3:DIRT:STONE-a:AIR-3:STONE:AIR-v:STONE:AIR-8:STONE-8:AIR-m:STONE:AIR-3:STONE-6:AIR-2:STONE-e:AIR-15:STONE:AIR-2:STONE-7:AIR-s:STONE-4:AIR-4:STONE-6:AIR-2:STONE-4:AIR-12:STONE:AIR-4:STONE:AIR:STONE-7:AIR-t:STONE-2:AIR-2:STONE:AIR-2:STONE-5:AIR-5:STONE-3:AIR-16:STONE:AIR-2:STONE-4:AIR-3:STONE:AIR-o:STONE:AIR-2:STONE:AIR-3:STONE:AIR-3:STONE-3:AIR-6:STONE-3:AIR-2:STONE:AIR-z:LEAF-3:AIR-5:STONE-2:AIR-3:STONE:AIR-s:STONE:AIR-2:STONE:AIR-4:STONE-3:AIR-4:STONE:AIR-2:STONE-2:AIR-11:LEAF-5:AIR-4:STONE:AIR-13:STONE:AIR:STONE-2:AIR-2:STONE:AIR-3:STONE:AIR-3:STONE:AIR-10:LEAF-2:OAK_WOOD:LEAF-2:AIR-4:STONE:AIR-w:STONE:AIR-2:LEAF-3:AIR-4:STONE:AIR:STONE:AIR-5:STONE:AIR-14:LEAF:OAK_WOOD:LEAF:AIR-7:STONE:AIR-w:LEAF-5:AIR-3:STONE:AIR:STONE:AIR-5:STONE:AIR-15:OAK_WOOD:AIR-15:LEAF-2:OAK_WOOD:LEAF-2:AIR-3:STONE:AIR-c:LEAF-3:AIR-3:MONSTER:LEAF-3:AIR-s:OAK_WOOD:AIR-15:LEAF:OAK_WOOD:LEAF:AIR-g:LEAF-5:AIR-2:LEAF-5:AIR-r:OAK_WOOD:AIR-17:OAK_WOOD:AIR-3:STONE:AIR-c:LEAF-2:OAK_WOOD:LEAF-2:AIR-2:LEAF-2:OAK_WOOD:LEAF-2:AIR-r:DIRT:GRASS-2:AIR-k:LEAF-3:AIR-d:GRASS-4:AIR:OAK_WOOD:AIR-h:LEAF:OAK_WOOD:LEAF:AIR-4:LEAF:OAK_WOOD:LEAF:AIR-p:GRASS-3:DIRT-3:GRASS:AIR-i:LEAF-5:AIR-b:GRASS:DIRT-4:GRASS:DIRT:GRASS:AIR-h:OAK_WOOD:AIR-6:OAK_WOOD:AIR-q:STONE:DIRT-6:GRASS:AIR-b:LEAF-3:AIR-3:LEAF-2:OAK_WOOD:LEAF-2:AIR-a:GRASS:DIRT-8:AIR-h:OAK_WOOD:AIR-6:OAK_WOOD:AIR-q:STONE-2:DIRT-5:STONE:AIR-a:LEAF-5:AIR-3:LEAF:OAK_WOOD:LEAF:AIR-b:DIRT-9:AIR-i:OAK_WOOD:AIR-6:OAK_WOOD:AIR-r:STONE-2:DIRT-2:STONE-2:AIR-a:LEAF-2:OAK_WOOD:LEAF-2:AIR-4:OAK_WOOD:AIR-c:STONE:DIRT-7:STONE:AIR-i:OAK_WOOD:AIR-6:OAK_WOOD:AIR-s:STONE-4:AIR-c:LEAF:OAK_WOOD:LEAF:AIR-5:OAK_WOOD:AIR-d:STONE-2:DIRT-3:STONE-2:AIR-j:OAK_WOOD:AIR:MONSTER:AIR-4:OAK_WOOD:AIR-q:STONE:AIR:STONE-3:AIR-e:OAK_WOOD:AIR-5:OAK_WOOD:AIR-e:STONE-7:AIR-j:OAK_WOOD:AIR:MONSTER:AIR-4:OAK_WOOD:AIR-t:STONE-2:AIR:STONE:AIR-c:OAK_WOOD:AIR-2:MONSTER:AIR-2:OAK_WOOD:AIR-f:STONE-4:AIR-k:GRASS:DIRT:GRASS-2:DIRT:GRASS-3:DIRT:GRASS-3:AIR-k:LEAF-3:AIR-3:STONE:AIR-2:STONE:AIR-c:OAK_WOOD:AIR:MONSTER:GRASS-3:DIRT:GRASS:AIR-f:STONE-2:AIR-2:STONE:AIR-f:GRASS-3:DIRT-c:GRASS:AIR-i:LEAF-5:AIR-4:STONE:AIR-c:GRASS:DIRT:GRASS-2:DIRT-5:GRASS-2:AIR-b:STONE:AIR-2:STONE:AIR-h:GRASS:DIRT-g:GRASS:AIR-h:LEAF-2:OAK_WOOD:LEAF-2:AIR:STONE:AIR-d:GRASS-2:DIRT-b:AIR-e:STONE:AIR-h:STONE-2:DIRT-e:STONE-2:AIR-i:LEAF:OAK_WOOD:LEAF:AIR-g:DIRT-d:AIR-w:STONE-3:DIRT-b:STONE-4:AIR-j:OAK_WOOD:AIR-h:STONE:DIRT-b:STONE:AIR-g:STONE:AIR-f:STONE-3:DIRT-a:STONE-5:AIR-i:OAK_WOOD:AIR-i:STONE-2:DIRT-8:STONE-3:AIR-x:STONE-3:DIRT-9:STONE-4:AIR-j:OAK_WOOD:AIR-j:STONE-2:DIRT-6:STONE-4:AIR-x:STONE-5:DIRT-6:STONE-4:AIR-k:OAK_WOOD:AIR-j:STONE-4:DIRT-4:STONE-3:AIR-z:STONE-5:DIRT-4:STONE-5:AIR-j:GRASS:DIRT:GRASS-4:AIR-g:STONE-5:DIRT:STONE-4:AIR-10:STONE-5:DIRT:STONE-6:AIR-j:GRASS:DIRT-6:GRASS-2:AIR-f:STONE-8:AIR-z:STONE:AIR-2:STONE-a:AIR-j:GRASS:DIRT-9:AIR-d:STONE:AIR:STONE-7:AIR-14:STONE-8:AIR-2:STONE:AIR-h:STONE-2:DIRT-7:STONE:AIR-f:STONE-6:AIR:STONE:AIR-11:STONE:AIR-2:STONE-7:AIR-2:STONE:AIR-i:STONE-3:DIRT-3:STONE-3:AIR-g:STONE-4:AIR-2:STONE:AIR-11:STONE-2:AIR-2:STONE-5:AIR-2:STONE:AIR-k:STONE-2:DIRT-2:STONE-3:AIR-h:STONE-4:AIR:STONE:AIR-13:STONE:AIR-2:STONE-3:AIR:STONE:AIR-2:STONE:AIR-k:STONE-3:DIRT:STONE-3:AIR-f:STONE:AIR-2:STONE-2:AIR-19:STONE-2:AIR-2:STONE:AIR-o:STONE-5:AIR-h:STONE:AIR-2:STONE:AIR-17:STONE:AIR-2:STONE:AIR-p:STONE:AIR-2:STONE-3:AIR-l:STONE:AIR-1a:STONE:AIR-q:STONE:AIR:STONE-2:AIR-2:STONE:AIR-l:STONE:AIR-1c:STONE:AIR-p:STONE:AIR:STONE-2:AIR-1t:BASALT:AIR-u:STONE:AIR:STONE:AIR-2n:STONE:AIR-g9:AIR-7ps:1;59:3:2o:5:2:3:2i:5:1:5:2i:3:2:5:2j:1:4:3:2k:1:5:1:1c:3:m:3:g:1:6:1:1b:5:k:5:f:1:6:1:1b:5:k:5:e:5:4:1:11:e:l:3:e:b:10:f:m:1:f:d:y:f:m:1:f:d:z:e:n:4:b:d:10:d:l:7:a:d:8:3:p:6j4:",
        pixelInventory: {
            DIRT: 2,
            GRASS: 1,
            SAND: 5,
            WATER: 4,
            OAK_WOOD: 5,
            SAPLING: 2,
        },
        name: "Floating Islands",
        description: "Whoa, look at these <b>Floating Islands</b>! So cool! Anyways, this level might be a little tough, having to place pixels all the way up here. At least gravity is on your side!",
    },
    "2-1": {
        saveCode: "20;air-205:oak_wood-2:air-17:oak_wood-4:air-15:oak_wood-6:air-6:oak_wood-2:air-5:oak_wood-2:air-4:oak_wood-2:air-4:oak_wood-4:air-5:oak_wood:air:monster:air-2:oak_wood:air-4:oak_wood-2:air-2:oak_wood-2:air-4:oak_wood:monster-2:air:monster:oak_wood:air-5:oak_wood:air:monster:oak_wood:air:grass-11:air-4:oak_wood:monster:air:oak_wood:grass-2:dirt-9:grass-9:dirt-42:air-400:0;144:1:255:",
        pixelInventory: {
            lava: 1,
        },
        name: "Volcanic Destruction",
        description: "It seems like the <b>monsters</b> are adapting here as we approach <b>The Volcano</b>. I have no idea what <b>The Volcano</b> is, but I'm sure we'll learn more later. These <b>monsters<b> figured out how to build houses to protect themselves! How can we break in? I wonder if Oak Wood is flammable...",
    },
    "2-2": {
        saveCode: "20;air-194:basalt:stone:obsidian-2:basalt:air-4:obsidian-2:basalt-2:obsidian:air-5:obsidian-2:oak_wood-3:basalt:obsidian-2:air:basalt-2:oak_wood-3:obsidian:basalt:air-2:basalt:obsidian:basalt:oak_wood-2:air:oak_wood-2:obsidian:basalt:obsidian-2:oak_wood-2:air:oak_wood-2:basalt:obsidian-3:basalt:oak_wood-2:air-3:oak_wood-2:air:basalt:oak_wood-2:air-3:oak_wood-2:basalt:air-2:basalt:obsidian:oak_wood:air-2:monster:oak_wood:air-2:obsidian:basalt:oak_wood:air-2:monster:oak_wood:obsidian:basalt:air-3:basalt:oak_wood:monster-3:oak_wood:air:grass-2:dirt:grass:monster-2:air:oak_wood:basalt:air-4:obsidian:oak_wood:air:grass:dirt:grass-2:dirt-5:grass-3:obsidian:air-3:grass-5:dirt-11:grass-5:dirt-47:air-400:1;100:300:",
        pixelInventory: {
            water: 1,
            lava: 1,
        },
        name: "Rocky Shells",
        description: "The <b>monsters</b> have figured out how to cool lava into stone, basalt, and obsidian. And they surrounded their houses with it! Maybe there's a weak spot?",
    },
    "2-3": {
        saveCode: "20;air-242:oak_wood-3:air-3:obsidian:basalt:obsidian:air-8:basalt:oak_wood-7:air:obsidian:water:basalt:lava-8:basalt:air:oak_wood:air-3:oak_wood:air-2:basalt:water:obsidian-2:lava-8:air:oak_wood:monster:air:monster:oak_wood:air-2:obsidian:water:obsidian:lava-9:grass-3:monster-2:oak_wood:air-2:obsidian:water:obsidian:lava-9:dirt-2:grass-3:oak_wood:air-2:basalt:water:obsidian:lava-9:dirt-4:grass-4:obsidian:water:basalt:obsidian:lava-8:dirt-8:basalt:water:obsidian-2:lava-8:air-400:0;80:10:10:11:9:12:16:5:16:11:10:10:11:9:180:",
        pixelInventory: {
            sand: 3,
            oak_wood: 5,
            leaf: 12,
            ash: 2,
        },
        name: "Burnt Ash",
        description: "The <b>monsters</b> built a wall to protect them from the lava! How do we get the fire over the wall?",
    },
    "2-4": {
        saveCode: "20;air-66:obsidian-2:basalt-2:obsidian:basalt:air-13:basalt:air-6:obsidian:air-11:obsidian:air-8:obsidian:air-10:basalt:air-3:monster:air-2:monster:air:basalt:air-6:grass-2:air-2:obsidian:oak_wood:air:monster-2:air:monster-2:oak_wood:obsidian:air-3:grass-3:dirt:grass-2:basalt:obsidian:basalt:oak_wood-6:obsidian:basalt-2:grass-3:dirt-5:obsidian:basalt:obsidian-2:basalt:oak_wood-2:obsidian:basalt-2:obsidian-3:dirt-6:obsidian:basalt:air-11:basalt:obsidian:dirt-5:basalt:air-13:obsidian:dirt-5:obsidian:air-13:basalt:dirt-5:obsidian:air-13:basalt:dirt-5:basalt:air-13:obsidian:dirt-5:obsidian:basalt:air-11:basalt:obsidian:dirt-6:obsidian-2:air-9:obsidian-2:dirt-8:basalt:obsidian:basalt:obsidian:air-4:basalt:obsidian:basalt:dirt-12:obsidian:basalt-2:obsidian:basalt:obsidian:dirt-27:air-348:fire-4:air-48:0;307:5:14:7:67:",
        pixelInventory: {
            sand: 3,
            water: 5,
            ash: 2,
        },
        name: "Steam Engines",
        description: "Looks like the monsters built their house on a bridge! How can we destroy them from under the bridge?",
    },
    "2-5": {
        saveCode: "20;air-119:lava:air-12:basalt:water:basalt:air-2:basalt-3:air-11:basalt:obsidian-8:air-11:obsidian-9:air-10:basalt:obsidian-9:air-10:basalt:obsidian-3:monster:air-2:obsidian-3:air-9:basalt-2:obsidian-3:monster-3:obsidian-3:air-6:stone:gunpowder:basalt-3:gunpowder-3:monster-3:obsidian-3:air-5:stone-2:gunpowder:basalt-3:obsidian:gunpowder:obsidian-7:grass-2:air-2:stone:basalt-3:gunpowder-2:basalt:gunpowder-2:obsidian-7:dirt:grass-4:dirt-5:gunpowder:obsidian-9:dirt-80:air-400:0;32:7:13:7:341:",
        pixelInventory: {
            dirt: 1,
            sand: 3,
            water: 1,
            oak_wood: 2,
            basalt: 1,
            gunpowder: 1,
        },
        name: "Fiery Explosions",
        description: "An obsidian box? How are we supposted to break in now? Wait, is that a trail of gunpowder I see?",
    },
    "2-6": {
        saveCode: "40;air-834:oak_wood-3:air-36:oak_wood-2:air:oak_wood-2:air-36:oak_wood:air:oak_wood:air-89:sand-6:air-16:sand-5:oak_wood-2:air:oak_wood-2:sand-15:air-12:sand-9:oak_wood:water:oak_wood:sand-17:air-9:sand-11:oak_wood:water:oak_wood:sand-18:monster:sand:monster-2:sand-15:oak_wood:water:oak_wood:sand-37:oak_wood:water:oak_wood:sand-37:oak_wood:water:oak_wood:sand-37:oak_wood:water:oak_wood:sand-37:oak_wood:water:oak_wood:sand-37:stone:water:stone:sand-2:stone-3:sand-10:stone-2:sand-16:stone-5:water:stone-11:sand-2:stone-9:sand-10:stone-7:water:stone-39:water:stone-3:water:stone-32:water-8:stone-28:water-12:stone-27:water-13:air-1600:0;879:1:39:1:38:2:35:1:1:3:600:",
        pixelInventory: {
            dirt: 2,
            sand: 2,
            oak_wood: 4,
            steam: 1,
            stone: 2,
        },
        name: "Oh Well",
        description: "Make sure to bring water when you visit the desert! I brought plently, in this well. Wait, how will I even get the water out? Nevermind, it seems like there are <b>monsters</b> hiding in that ditch over there. You have some water, right? No? Oh well, I guess we'll never be able to destroy the monsters...",
    },
    "3-1": {
        saveCode: "20;air-64:sand:air-39:water:air-38:oak_wood:air:oak_wood:air-37:oak_wood:air:oak_wood:air-44:oak_wood-2:air-8:lava:air-8:oak_wood-4:air-7:sand:air-7:oak_wood-6:air-6:sand-4:air-5:oak_wood:air-2:oak_wood:air-2:sand-11:air-3:oak_wood:air:monster:sand-88:air-400:0;144:1:18:1:20:1:215:",
        pixelInventory: {
            snow: 1,
        },
        name: "Frozen Desert",
        description: "Snow in a desert? Crazy! Anyways, how do we stop the water from blocking the lava? Maybe we could freeze it with snow...",
    },
    "3-2": {
        saveCode: "20;ice-3:snow-10:ice-3:snow-4:ice:snow-6:ice-5:snow-2:ice-3:snow-7:ice-6:snow-5:ice-3:snow-4:ice-4:snow-11:ice-2:snow-11:ice-4:snow-6:stone-6:snow-3:ice-3:snow-6:ice-2:stone-7:snow-9:ice-3:snow:air-4:stone-3:air-4:stone-3:snow-3:ice:snow-2:air-11:stone-6:snow-3:air-13:stone-7:air-17:stone-3:water:air-18:stone-6:air-15:stone-12:air-6:monster:air:snow-7:stone-12:air:snow-15:stone-5:snow-2:ice-2:snow-8:ice-2:snow-9:ice-3:snow-4:ice-3:snow-5:ice-3:snow-3:ice-3:snow-3:ice-2:snow-6:ice-3:snow-16:ice-3:air-400:0;147:4:249:",
        pixelInventory: {
            sand: 4,
            frost_fire: 4,
        },
        name: "Chilly Cave",
        description: "Brrrr! It's freezing in here! Oh no! The cave is going to collapse and block the water! We only have sand to block it! What do we do?",
    },
    "3-3": {
        saveCode: "20;air-64:snow:air-18:snow:leaf:snow:air-7:snow:air-9:leaf-3:air-6:snow:leaf:snow:air-7:snow-2:spruce_wood:snow-2:air-4:monster:leaf-3:air-7:leaf-2:spruce_wood:leaf-2:air-3:snow-3:spruce_wood:snow-3:air-6:leaf:spruce_wood:leaf:air-4:leaf-3:spruce_wood:leaf-3:air-4:snow-3:spruce_wood:snow-3:air-3:leaf-2:spruce_wood:leaf-2:monster:air-4:leaf-3:spruce_wood:leaf-3:air:snow-4:spruce_wood:snow-4:air-4:leaf-2:spruce_wood:leaf-2:air-2:leaf-4:spruce_wood:leaf-4:air-2:monster:air-3:spruce_wood:air-5:leaf-3:spruce_wood:leaf-3:air-2:monster:ice-2:monster:air:spruce_wood:air-8:spruce_wood:air-5:ice:snow-8:air:monster:ice-3:spruce_wood:air:snow-5:dirt-7:snow-4:ice-2:snow-3:dirt-14:snow-4:dirt-66:air-400:1;1:8:3:5:4:8:3:5:4:16:4:339:",
        pixelInventory: {
            dirt: 3,
            sand: 7,
            water: 1,
        },
        name: "Snowy Forest",
        description: "Look at those giant spruce trees! Oh, watch your step. You don't want to trip on the ice boulders over here!",
    },
    "4-1": {
        saveCode: "20;OBSIDIAN-4:MONSTER-2:AIR-e:OBSIDIAN:MONSTER:OBSIDIAN-2:AIR-2:OBSIDIAN-d:AIR:OBSIDIAN:AIR:OBSIDIAN-2:AIR-2:OBSIDIAN-d:AIR:OBSIDIAN:AIR:OBSIDIAN-2:AIR-2:OBSIDIAN-d:AIR:OBSIDIAN:AIR:OBSIDIAN-2:AIR-2:OBSIDIAN-d:AIR:OBSIDIAN:AIR:OBSIDIAN-2:AIR-2:OBSIDIAN-9:MONSTER:AIR-3:MONSTER:OBSIDIAN:AIR-j:OBSIDIAN:MONSTER:AIR-3:MONSTER:AIR-b:MONSTER:AIR-2:OBSIDIAN:AIR-j:OBSIDIAN:AIR:OBSIDIAN-2:AIR-2:OBSIDIAN-9:MONSTER:AIR-3:MONSTER:OBSIDIAN:AIR:OBSIDIAN-2:AIR-2:OBSIDIAN-f:AIR:OBSIDIAN-2:AIR-2:OBSIDIAN-f:AIR:OBSIDIAN-2:AIR-2:OBSIDIAN:AIR-c:OBSIDIAN-2:AIR:OBSIDIAN-2:AIR-2:OBSIDIAN:AIR:MONSTER:AIR-a:OBSIDIAN-2:AIR:OBSIDIAN-2:AIR-2:OBSIDIAN:AIR-c:OBSIDIAN-2:AIR:OBSIDIAN-2:AIR-2:OBSIDIAN-f:AIR:OBSIDIAN-2:AIR-2:OBSIDIAN-f:AIR:OBSIDIAN-2:AIR-f:OBSIDIAN-2:AIR:OBSIDIAN-2:AIR-f:OBSIDIAN-l:AIR-b4:0;j:1:2p:1:p:1:b:1:3:1:11:1:27:1:1v:1:f:1:2:2:y:",
        pixelInventory: {
            piston_left: 4,
            piston_right: 1,
            piston_up: 4,
            piston_down: 2,
        },
        name: "Movement Madness",
        description: "Whoa, these are some fancy pixels! The push themselves and are not affected by gravity!",
    },
    "4-2": {
        saveCode: "20;OBSIDIAN-16:MONSTER:AIR-f:OBSIDIAN-4:AIR-f:MONSTER:OBSIDIAN-a:MONSTER:OBSIDIAN-j:MONSTER:OBSIDIAN-d:AIR:MONSTER:AIR-2:OBSIDIAN-2:MONSTER:OBSIDIAN-5:AIR:MONSTER:AIR:MONSTER:OBSIDIAN-4:AIR-4:OBSIDIAN-2:AIR-4:OBSIDIAN-2:AIR-4:OBSIDIAN-4:AIR-4:OBSIDIAN-2:AIR-4:OBSIDIAN-2:AIR-4:OBSIDIAN-4:AIR-4:OBSIDIAN-2:AIR-4:OBSIDIAN-2:AIR-4:OBSIDIAN-4:AIR-4:OBSIDIAN-2:AIR-4:OBSIDIAN-2:AIR-4:OBSIDIAN-4:AIR-a:OBSIDIAN-2:AIR-4:OBSIDIAN-4:AIR-a:OBSIDIAN-2:AIR-4:OBSIDIAN-4:AIR-4:OBSIDIAN-2:AIR-4:OBSIDIAN-2:AIR-4:OBSIDIAN-4:AIR-4:OBSIDIAN-2:AIR-4:OBSIDIAN-2:AIR-4:OBSIDIAN-4:AIR-4:OBSIDIAN-2:AIR-4:OBSIDIAN-2:AIR-4:OBSIDIAN-6:AIR-2:OBSIDIAN-2:AIR-4:OBSIDIAN-2:AIR-4:OBSIDIAN-3:AIR-4:OBSIDIAN-3:AIR-4:OBSIDIAN-2:AIR-4:OBSIDIAN-16:AIR-b4:0;1g:2:8:1:9:1:6j:2:i:2:4:2:5:2:5:2:4:2:18:",
        pixelInventory: {
            piston_left: 3,
            piston_right: 3,
            piston_up: 4,
            piston_down: 1,
        },
        name: "Clever Pushing",
        description: "Hmm, how do we get to the monsters? Maybe if we use pistons to push other pistons...",
    },
    "4-3": {
        saveCode: "20;OBSIDIAN-16:MONSTER-6:OBSIDIAN-2:MONSTER-6:AIR-2:OBSIDIAN-4:MONSTER-6:OBSIDIAN-2:MONSTER-6:AIR-2:OBSIDIAN-4:MONSTER-6:OBSIDIAN-2:MONSTER-6:AIR-2:OBSIDIAN-4:MONSTER-6:OBSIDIAN-2:MONSTER-6:AIR-2:OBSIDIAN-4:MONSTER-6:OBSIDIAN-2:MONSTER-4:OBSIDIAN-2:AIR-2:OBSIDIAN-4:MONSTER-6:OBSIDIAN-2:MONSTER-4:OBSIDIAN-2:AIR-2:OBSIDIAN-4:MONSTER-6:OBSIDIAN-2:MONSTER-4:OBSIDIAN-2:AIR-2:OBSIDIAN-4:MONSTER-6:OBSIDIAN-2:MONSTER-4:OBSIDIAN-2:AIR-2:OBSIDIAN-4:MONSTER-6:OBSIDIAN-e:MONSTER-6:OBSIDIAN-e:AIR-g:OBSIDIAN-4:AIR-g:OBSIDIAN-4:AIR-g:OBSIDIAN-4:AIR-e:OBSIDIAN:AIR:OBSIDIAN-4:AIR-g:OBSIDIAN-4:AIR-g:OBSIDIAN-16:AIR-b4:0;4w:2:i:2:23:4:g:4:g:3:h:4:1r:",
        pixelInventory: {
            piston_left: 1,
            piston_up: 1,
            piston_down: 1,
            cloner_left: 1,
            cloner_up: 2,
        },
        name: "Infinite Clones",
        description: "The room is flooding with monsters! Wait, is that a cloner? Cloners clone the pixel behind them and push it in front of them! We can use this to destroy all the monsters.",
    },
    "4-A": {
        saveCode: "20;OBSIDIAN-16:AIR-g:OBSIDIAN-4:AIR-g:OBSIDIAN-4:AIR-g:OBSIDIAN-4:AIR-g:OBSIDIAN-4:AIR-g:OBSIDIAN-4:AIR-g:OBSIDIAN-4:AIR-g:OBSIDIAN-4:AIR-g:OBSIDIAN-i:AIR-2:OBSIDIAN-i:AIR-2:OBSIDIAN-4:AIR-a:MONSTER-2:OBSIDIAN-2:AIR-2:OBSIDIAN-4:AIR-a:MONSTER-2:OBSIDIAN-2:AIR-2:OBSIDIAN-4:AIR-c:OBSIDIAN-2:AIR-2:OBSIDIAN-4:AIR-c:OBSIDIAN-2:AIR-2:OBSIDIAN-4:AIR-g:OBSIDIAN-4:AIR-g:OBSIDIAN-16:AIR-b4:0;16:4:g:4:g:4:g:4:g:4:g:4:g:4:g:4:5y:",
        pixelInventory: {
            cloner_left: 1,
            cloner_right: 4,
            cloner_up: 1,
            cloner_down: 2,
        },
        name: "Around the Corner",
        description: "These monsters thinking they're so sneaky, hiding behind that wall. You have tons of cloners, surely you can find a way to get around the corner.",
    },
    "4-4": {
        saveCode: "20;OBSIDIAN-16:AIR-g:OBSIDIAN-4:AIR-g:OBSIDIAN-4:AIR-6:MONSTER:AIR-9:OBSIDIAN-9:AIR:MONSTER:OBSIDIAN-2:AIR-2:OBSIDIAN-e:AIR-2:OBSIDIAN-2:AIR-2:OBSIDIAN-9:AIR-e:MONSTER-2:OBSIDIAN-4:AIR-7:OBSIDIAN-2:AIR-2:OBSIDIAN-2:AIR:MONSTER:AIR:OBSIDIAN-4:AIR-7:OBSIDIAN-2:AIR-2:OBSIDIAN-2:AIR:MONSTER:AIR:OBSIDIAN-4:AIR-b:OBSIDIAN-2:AIR:MONSTER:AIR:OBSIDIAN-4:AIR-b:OBSIDIAN-2:AIR-3:OBSIDIAN-4:AIR-b:OBSIDIAN-2:AIR-3:OBSIDIAN-4:AIR:OBSIDIAN-2:AIR-2:OBSIDIAN-8:AIR-3:OBSIDIAN-4:AIR-4:MONSTER:OBSIDIAN-8:AIR:MONSTER:AIR:OBSIDIAN-4:AIR-b:OBSIDIAN-2:AIR:MONSTER:AIR:OBSIDIAN-4:AIR-b:OBSIDIAN-2:AIR:MONSTER:AIR:OBSIDIAN-4:AIR-b:OBSIDIAN-2:AIR:MONSTER:AIR:OBSIDIAN-16:AIR-b4:0;16:5:6:5:o:5:6:5:u:1:d:2:i:2:18:1:l:3:3:1:d:3:3:1:j:1:z:1:9:2:i:2:8:1:1b:",
        pixelInventory: {
            piston_left: 1,
            piston_right: 1,
            cloner_up: 1,
            rotator_clockwise: 7,
            rotator_counter_clockwise: 2,
        },
        name: "Spinny Rotator",
        description: "Rotators will rotate pistons and cloners they touch by 90 degrees. Seems like you need to rotate some pistons to move in other directions to navigate this maze and destroy the monsters. Good luck!",
    },
    "4-5": {
        saveCode: "20;OBSIDIAN-16:AIR-6:OBSIDIAN:AIR-2:OBSIDIAN:AIR-6:OBSIDIAN-4:AIR-g:OBSIDIAN-5:AIR:OBSIDIAN-5:AIR-2:OBSIDIAN-5:AIR:OBSIDIAN-5:AIR-3:OBSIDIAN:AIR-3:MONSTER:AIR-4:OBSIDIAN:AIR-3:OBSIDIAN-4:AIR:MONSTER:AIR:OBSIDIAN:AIR:MONSTER:AIR-6:OBSIDIAN:AIR:MONSTER:AIR:OBSIDIAN-4:AIR:MONSTER-2:OBSIDIAN:AIR-3:MONSTER:AIR-4:MONSTER:AIR:MONSTER-2:OBSIDIAN-4:AIR:MONSTER:AIR:OBSIDIAN:AIR:MONSTER:AIR:MONSTER:AIR-2:MONSTER:AIR-3:MONSTER:AIR:OBSIDIAN-4:AIR-3:OBSIDIAN:AIR:MONSTER:AIR:MONSTER:AIR-4:OBSIDIAN:AIR:MONSTER:AIR:OBSIDIAN-4:AIR:MONSTER:AIR-8:MONSTER:AIR:OBSIDIAN:AIR:MONSTER:AIR:OBSIDIAN-4:AIR:MONSTER:AIR-3:MONSTER:AIR:MONSTER:AIR-4:OBSIDIAN:AIR-3:OBSIDIAN-4:AIR:MONSTER:AIR:OBSIDIAN:AIR-3:MONSTER:AIR-2:MONSTER:AIR:OBSIDIAN:AIR:MONSTER:AIR:OBSIDIAN-4:AIR:MONSTER:AIR:OBSIDIAN:AIR:MONSTER:AIR-4:MONSTER:AIR-5:OBSIDIAN-4:AIR-3:OBSIDIAN:AIR:MONSTER:AIR:MONSTER:AIR-6:MONSTER:AIR:OBSIDIAN-4:AIR:MONSTER:AIR:OBSIDIAN:AIR-6:MONSTER:AIR:OBSIDIAN:AIR:MONSTER:AIR:OBSIDIAN-4:AIR-3:OBSIDIAN:AIR:MONSTER:AIR-6:OBSIDIAN:AIR-3:OBSIDIAN-4:AIR-3:OBSIDIAN:AIR-8:OBSIDIAN:AIR-3:OBSIDIAN-16:AIR-b4:0;1q:1:4:5:4:2:5:1:5:2:5:1:b:1:2:1:k:1:59:1:1:1:a:1:1:1:4:1:1:1:1:1:1:1:1:1:1:1:2:1:1:1:16:",
        pixelInventory: {
            piston_left: 2,
            piston_right: 1,
            cloner_left: 1,
            cloner_right: 1,
            cloner_down: 3,
            rotator_clockwise: 3,
            rotator_counter_clockwise: 1,
            alternator: 6,
        },
        name: "Clocked Pistons",
        description: "Alternators are like rotators, except they rotate by 180 degrees. Useful if you need a quick turn. This formation of monsters is unusual, almost as if they are lining up for a reason. Well, I guess we'll find out later, for now, use these alternators to destroy the monsters!",
    },
    "4-B": {
        //20;obsidian-42:air-7:obsidian-2:air-3:monster:air:obsidian:air:obsidian-4:air:monster-3:air-3:obsidian-2:air-2:monster-2:air-3:obsidian-4:monster:air:obsidian:monster:obsidian:monster:air-4:monster:air-3:obsidian:air:obsidian-4:monster:air:obsidian:air:obsidian:air-2:obsidian-2:monster:air:obsidian-2:air:obsidian:air:obsidian-4:air-7:obsidian-2:air-2:obsidian-2:monster:obsidian:air:obsidian-4:air-7:obsidian-2:air-2:obsidian-2:air:obsidian:air:obsidian-13:monster:air:obsidian-2:air:obsidian:air:obsidian-13:monster:air:obsidian-2:air:obsidian-6:air-7:monster:air-3:monster-2:air-3:obsidian-4:air-9:monster:air-4:monster:air:obsidian-4:air-2:obsidian-3:air:obsidian-3:air-2:obsidian-2:air-3:obsidian-4:air-2:obsidian-3:monster:obsidian-3:air-2:obsidian-2:monster:air-2:obsidian-4:air-2:obsidian:air-2:monster-2:air:obsidian:air-2:obsidian-2:air:monster:air:obsidian-4:monster:air:obsidian-2:air-2:monster:obsidian-2:monster:air:obsidian-2:monster-2:air:obsidian-4:air-4:monster-2:air-5:obsidian-2:air:monster:air:obsidian-4:air-8:monster:air-2:obsidian-2:air-3:obsidian-8:air:obsidian:air:obsidian-31:air-400:0;51:1:3:1:1:1:4:1:5:1:7:1:16:1:11:1:2:1:33:1:2:1:2:1:8:1:19:1:28:3:8:1:67:1:3:1:13:1:31:1:1:1:4:1:4:1:4:1:2:3:8:1:1:1:31:
        saveCode: "20;OBSIDIAN-16:AIR-7:OBSIDIAN-2:AIR-3:MONSTER:AIR:OBSIDIAN:AIR:OBSIDIAN-4:AIR:MONSTER-3:AIR-3:OBSIDIAN-2:AIR-2:MONSTER-2:AIR-3:OBSIDIAN-4:MONSTER:AIR:OBSIDIAN:MONSTER:OBSIDIAN:MONSTER:AIR-4:MONSTER:AIR-3:OBSIDIAN:AIR:OBSIDIAN-4:MONSTER:AIR:OBSIDIAN:AIR:OBSIDIAN:AIR-2:OBSIDIAN-2:MONSTER:AIR:OBSIDIAN-2:AIR:OBSIDIAN:AIR:OBSIDIAN-4:AIR-7:OBSIDIAN-2:AIR-2:OBSIDIAN-2:MONSTER:OBSIDIAN:AIR:OBSIDIAN-4:AIR-7:OBSIDIAN-2:AIR-2:OBSIDIAN-2:AIR:OBSIDIAN:AIR:OBSIDIAN-d:MONSTER:AIR:OBSIDIAN-2:AIR:OBSIDIAN:AIR:OBSIDIAN-d:MONSTER:AIR:OBSIDIAN-2:AIR:OBSIDIAN-6:AIR-7:MONSTER:AIR-3:MONSTER-2:AIR-3:OBSIDIAN-4:AIR-9:MONSTER:AIR-4:MONSTER:AIR:OBSIDIAN-4:AIR-2:OBSIDIAN-3:AIR:OBSIDIAN-3:AIR-2:OBSIDIAN-2:AIR-3:OBSIDIAN-4:AIR-2:OBSIDIAN-3:MONSTER:OBSIDIAN-3:AIR-2:OBSIDIAN-2:MONSTER:AIR-2:OBSIDIAN-4:AIR-2:OBSIDIAN:AIR-2:MONSTER-2:AIR:OBSIDIAN:AIR-2:OBSIDIAN-2:AIR:MONSTER:AIR:OBSIDIAN-4:MONSTER:AIR:OBSIDIAN-2:AIR-2:MONSTER:OBSIDIAN-2:MONSTER:AIR:OBSIDIAN-2:MONSTER-2:AIR:OBSIDIAN-4:AIR-4:MONSTER-2:AIR-5:OBSIDIAN-2:AIR:MONSTER:AIR:OBSIDIAN-4:AIR-8:MONSTER:AIR-2:OBSIDIAN-2:AIR-3:OBSIDIAN-8:AIR:OBSIDIAN:AIR:OBSIDIAN-v:AIR-b4:0;1f:1:3:1:1:1:4:1:5:1:7:1:g:1:b:1:2:1:x:1:2:1:2:1:8:1:j:1:s:3:8:1:1v:1:3:1:d:1:v:1:1:1:4:1:4:1:4:1:2:3:8:1:1:1:v:",
        pixelInventory: {
            piston_up: 1,
            cloner_left: 1,
            cloner_up: 2,
            cloner_down: 1,
            rotator_clockwise: 3,
            rotator_counter_clockwise: 7,
            alternator: 7,
        },
        name: "Rectangular Rooms",
        description: "Look at these hallways crowding with monsters! Those cloners will definitely be useful. But only 4? I guess you will have to find another way...",
    },
    "vault": {
        saveCode: "50;air-932:oak_wood:air-8:oak_wood:air-39:oak_wood:explosives:rotator_clockwise-8:explosives:oak_wood:air-39:rotator_clockwise:explosives:obsidian-6:explosives:rotator_clockwise:air-40:rotator_clockwise:obsidian:explosives:obsidian-4:explosives:obsidian:rotator_clockwise:air-40:rotator_clockwise:obsidian-2:explosives:obsidian-2:explosives:obsidian-2:rotator_clockwise:air-40:rotator_clockwise:obsidian-3:monster-2:obsidian-3:rotator_clockwise:air-40:rotator_clockwise:obsidian-3:monster-2:obsidian-3:rotator_clockwise:air-40:rotator_clockwise:obsidian-2:explosives:obsidian-2:explosives:obsidian-2:rotator_clockwise:air-40:rotator_clockwise:obsidian:explosives:obsidian-4:explosives:obsidian:rotator_clockwise:air-40:rotator_clockwise:explosives:obsidian-6:explosives:rotator_clockwise:air-39:oak_wood:explosives:rotator_clockwise-8:explosives:oak_wood:air-39:oak_wood:air-8:oak_wood:air-1008:air-2500:0;857:6:44:6:44:6:44:6:44:6:44:6:1387:",
        pixelInventory: {
            piston_up: 1,
            ignitor_left: 1,
            rotator_clockwise: 1,
            rotator_counter_clockwise: 1,
        },
        name: "Vault lol",
        description: "testing testing VAULT",
    },
    "vault2": {
        saveCode: "100;air-5138:deleter-29:air-66:deleter-5:cloner_right-29:deleter-5:air-61:deleter-5:cloner_right-29:deleter-5:air-61:deleter-5:cloner_right-29:deleter-5:air-61:deleter-5:cloner_right-29:deleter-5:air-61:deleter-5:cloner_right-29:deleter-5:air-60:deleter:cloner_up-7:deleter-4:cloner_up-2:deleter-4:cloner_up-5:deleter-4:cloner_up-2:deleter:cloner_up-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_right-26:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter-27:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-23:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-23:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter-19:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-2:deleter:obsidian-17:deleter:obsidian-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-2:deleter:obsidian-17:deleter:obsidian-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter:obsidian-17:deleter:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter-11:obsidian-3:deleter:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter:obsidian-9:deleter:obsidian-3:deleter:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter:obsidian-9:deleter:obsidian-3:deleter:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter:obsidian-2:air-5:obsidian-2:deleter:obsidian-3:deleter:obsidian-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter:obsidian-2:air-2:monster:air-2:obsidian-2:deleter:obsidian-3:deleter:obsidian-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter:obsidian-2:air:oak_wood-3:air:obsidian-2:deleter:obsidian-3:deleter:obsidian-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter:obsidian-2:air-2:oak_wood:air-2:obsidian-2:deleter:obsidian-3:deleter:obsidian-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter:obsidian-9:deleter:obsidian-3:deleter:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter:obsidian-9:deleter:obsidian-3:deleter:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter-11:obsidian-3:deleter:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter:obsidian-17:deleter:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-2:deleter:obsidian-17:deleter:obsidian-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-2:deleter:obsidian-17:deleter:obsidian-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter-19:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-23:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-23:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter-27:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:cloner_left-26:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:cloner_down-2:deleter:cloner_down-2:deleter-4:cloner_down-5:deleter-4:cloner_down-2:deleter-4:cloner_down-7:deleter:air-60:deleter-5:cloner_left-29:deleter-5:air-61:deleter-5:cloner_left-29:deleter-5:air-61:deleter-5:cloner_left-29:deleter-5:air-61:deleter-5:cloner_left-29:deleter-5:air-61:deleter-5:cloner_left-29:deleter-5:air-66:deleter-29:air-933:air-10000:1;4320:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:37:63:17:",
        pixelInventory: {
            all: 1000000,
            ignitor_launcher_left: -1000000,
            ignitor_launcher_right: -1000000,
            ignitor_launcher_up: -1000000,
            ignitor_launcher_down: -1000000,
            frost_ignitor_launcher_left: -1000000,
            frost_ignitor_launcher_right: -1000000,
            frost_ignitor_launcher_up: -1000000,
            frost_ignitor_launcher_down: -1000000,
        },
        name: "OP VAULT",
        description: "sp head confirmed??",
    },
    "vault3": {
        // saveCode: "100;air-4046:deleter-17:air-82:deleter:slider_horizontal-17:deleter:air-76:deleter-5:slider_vertical:cloner_left-8:basalt:cloner_right-8:slider_vertical:deleter-5:air-71:deleter:obsidian-4:slider_vertical:cloner_left-8:basalt:cloner_right-8:slider_vertical:obsidian-4:deleter:air-71:deleter:obsidian-4:slider_vertical:cloner_left-8:basalt:cloner_right-8:slider_vertical:obsidian-4:deleter:air-71:deleter:obsidian-4:slider_vertical:cloner_left-8:basalt:cloner_right-8:slider_vertical:obsidian-4:deleter:air-71:deleter:obsidian-4:slider_vertical:cloner_left-8:basalt:cloner_right-8:slider_vertical:obsidian-4:deleter:air-70:deleter:slider_horizontal-5:obsidian-2:cloner_up-15:obsidian-2:slider_horizontal-5:deleter:air-68:deleter:slider_vertical:cloner_up-5:obsidian-2:cloner_left-7:basalt:cloner_right-7:obsidian-2:cloner_up-5:slider_vertical:deleter:air-67:deleter:slider_vertical:cloner_up-5:cloner_left:cloner_up:obsidian-15:cloner_up:cloner_right:cloner_up-5:slider_vertical:deleter:air-67:deleter:slider_vertical:cloner_up-5:cloner_left:cloner_up:obsidian-15:cloner_up:cloner_right:cloner_up-5:slider_vertical:deleter:air-67:deleter:slider_vertical:cloner_up-5:cloner_left:cloner_up:obsidian-15:cloner_up:cloner_right:cloner_up-5:slider_vertical:deleter:air-67:deleter:slider_vertical:cloner_up-5:cloner_left:cloner_up:obsidian-15:cloner_up:cloner_right:cloner_up-5:slider_vertical:deleter:air-67:deleter:slider_vertical:cloner_up-5:cloner_left:cloner_up:obsidian-15:cloner_up:cloner_right:cloner_up-5:slider_vertical:deleter:air-67:deleter:slider_vertical:cloner_up-5:cloner_left:cloner_up:obsidian-15:cloner_up:cloner_right:cloner_up-5:slider_vertical:deleter:air-67:deleter:slider_vertical:cloner_up-5:cloner_left:cloner_up:obsidian-6:monster-3:obsidian-6:cloner_up:cloner_right:cloner_up-5:slider_vertical:deleter:air-67:deleter:slider_vertical:basalt-5:cloner_left:basalt:obsidian-6:monster-3:obsidian-6:basalt:cloner_right:basalt-5:slider_vertical:deleter:air-67:deleter:slider_vertical:cloner_down-5:cloner_left:cloner_down:obsidian-6:monster-3:obsidian-6:cloner_down:cloner_right:cloner_down-5:slider_vertical:deleter:air-67:deleter:slider_vertical:cloner_down-5:cloner_left:cloner_down:obsidian-15:cloner_down:cloner_right:cloner_down-5:slider_vertical:deleter:air-67:deleter:slider_vertical:cloner_down-5:cloner_left:cloner_down:obsidian-15:cloner_down:cloner_right-2:cloner_down-4:slider_vertical:deleter:air-67:deleter:slider_vertical:cloner_down-5:cloner_left:cloner_down:obsidian-15:cloner_down:cloner_right-2:cloner_down-4:slider_vertical:deleter:air-67:deleter:slider_vertical:cloner_down-5:cloner_left:cloner_down:obsidian-15:cloner_down:cloner_right:cloner_down-5:slider_vertical:deleter:air-67:deleter:slider_vertical:cloner_down-5:cloner_left:cloner_down:obsidian-15:cloner_down:cloner_right:cloner_down-5:slider_vertical:deleter:air-67:deleter:slider_vertical:cloner_down-5:cloner_left:cloner_down:obsidian-15:cloner_down:cloner_right:cloner_down-5:slider_vertical:deleter:air-67:deleter:slider_vertical:cloner_down-5:obsidian-2:cloner_left-7:basalt:cloner_right-7:obsidian-2:cloner_down-5:slider_vertical:deleter:air-68:deleter:slider_horizontal-5:obsidian-2:cloner_down-15:obsidian-2:slider_horizontal-5:deleter:air-70:deleter:obsidian-4:slider_vertical:cloner_left-8:basalt:cloner_right-8:slider_vertical:obsidian-4:deleter:air-71:deleter:obsidian-4:slider_vertical:cloner_left-8:basalt:cloner_right-8:slider_vertical:obsidian-4:deleter:air-71:deleter:obsidian-4:slider_vertical:cloner_left-8:basalt:cloner_right-8:slider_vertical:obsidian-4:deleter:air-71:deleter:obsidian-4:slider_vertical:cloner_left-8:basalt:cloner_right-8:slider_vertical:obsidian-4:deleter:air-71:deleter-5:slider_vertical:cloner_left-8:basalt:cloner_right-8:slider_vertical:deleter-5:air-76:deleter:slider_horizontal-17:deleter:air-82:deleter-17:air-2737:air-10000:1;2725:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:44:56:1919:",
        saveCode: "100;AIR-34e:DELETER-h:AIR-2a:DELETER:SLIDER_HORIZONTAL-h:DELETER:AIR-24:DELETER-5:SLIDER_VERTICAL:CLONER_LEFT-8:BASALT:CLONER_RIGHT-8:SLIDER_VERTICAL:DELETER-5:AIR-1z:DELETER:OBSIDIAN-4:SLIDER_VERTICAL:CLONER_LEFT-8:BASALT:CLONER_RIGHT-8:SLIDER_VERTICAL:OBSIDIAN-4:DELETER:AIR-1z:DELETER:OBSIDIAN-4:SLIDER_VERTICAL:CLONER_LEFT-8:BASALT:CLONER_RIGHT-8:SLIDER_VERTICAL:OBSIDIAN-4:DELETER:AIR-1z:DELETER:OBSIDIAN-4:SLIDER_VERTICAL:CLONER_LEFT-8:BASALT:CLONER_RIGHT-8:SLIDER_VERTICAL:OBSIDIAN-4:DELETER:AIR-1z:DELETER:OBSIDIAN-4:SLIDER_VERTICAL:CLONER_LEFT-8:BASALT:CLONER_RIGHT-8:SLIDER_VERTICAL:OBSIDIAN-4:DELETER:AIR-1y:DELETER:SLIDER_HORIZONTAL-5:OBSIDIAN-2:CLONER_UP-f:OBSIDIAN-2:SLIDER_HORIZONTAL-5:DELETER:AIR-1w:DELETER:SLIDER_VERTICAL:CLONER_UP-5:OBSIDIAN-2:CLONER_LEFT-7:BASALT:CLONER_RIGHT-7:OBSIDIAN-2:CLONER_UP-5:SLIDER_VERTICAL:DELETER:AIR-1v:DELETER:SLIDER_VERTICAL:CLONER_UP-5:CLONER_LEFT:CLONER_UP:OBSIDIAN-2:BASALT-b:OBSIDIAN-2:CLONER_UP:CLONER_RIGHT:CLONER_UP-5:SLIDER_VERTICAL:DELETER:AIR-1v:DELETER:SLIDER_VERTICAL:CLONER_UP-5:CLONER_LEFT:CLONER_UP:OBSIDIAN-2:CLONER_UP-b:OBSIDIAN-2:CLONER_UP:CLONER_RIGHT:CLONER_UP-5:SLIDER_VERTICAL:DELETER:AIR-1v:DELETER:SLIDER_VERTICAL:CLONER_UP-5:CLONER_LEFT:CLONER_UP:BASALT:CLONER_LEFT:BASALT-b:CLONER_RIGHT:BASALT:CLONER_UP:CLONER_RIGHT:CLONER_UP-5:SLIDER_VERTICAL:DELETER:AIR-1v:DELETER:SLIDER_VERTICAL:CLONER_UP-5:CLONER_LEFT:CLONER_UP:BASALT:CLONER_LEFT:BASALT:OBSIDIAN-9:BASALT:CLONER_RIGHT:BASALT:CLONER_UP:CLONER_RIGHT:CLONER_UP-5:SLIDER_VERTICAL:DELETER:AIR-1v:DELETER:SLIDER_VERTICAL:CLONER_UP-5:CLONER_LEFT:CLONER_UP:BASALT:CLONER_LEFT:BASALT:OBSIDIAN-9:BASALT:CLONER_RIGHT:BASALT:CLONER_UP:CLONER_RIGHT:CLONER_UP-5:SLIDER_VERTICAL:DELETER:AIR-1v:DELETER:SLIDER_VERTICAL:CLONER_UP-5:CLONER_LEFT:CLONER_UP:BASALT:CLONER_LEFT:BASALT:OBSIDIAN-9:BASALT:CLONER_RIGHT:BASALT:CLONER_UP:CLONER_RIGHT:CLONER_UP-5:SLIDER_VERTICAL:DELETER:AIR-1v:DELETER:SLIDER_VERTICAL:CLONER_UP-5:CLONER_LEFT:CLONER_UP:BASALT:CLONER_LEFT:BASALT:OBSIDIAN-3:MONSTER-3:OBSIDIAN-3:BASALT:CLONER_RIGHT:BASALT:CLONER_UP:CLONER_RIGHT:CLONER_UP-5:SLIDER_VERTICAL:DELETER:AIR-1v:DELETER:SLIDER_VERTICAL:BASALT-5:CLONER_LEFT:BASALT-2:CLONER_LEFT:BASALT:OBSIDIAN-3:MONSTER-3:OBSIDIAN-3:BASALT:CLONER_RIGHT:BASALT-2:CLONER_RIGHT:BASALT-5:SLIDER_VERTICAL:DELETER:AIR-1v:DELETER:SLIDER_VERTICAL:CLONER_DOWN-5:CLONER_LEFT:CLONER_DOWN:BASALT:CLONER_LEFT:BASALT:OBSIDIAN-3:MONSTER-3:OBSIDIAN-3:BASALT:CLONER_RIGHT:BASALT:CLONER_DOWN:CLONER_RIGHT:CLONER_DOWN-5:SLIDER_VERTICAL:DELETER:AIR-1v:DELETER:SLIDER_VERTICAL:CLONER_DOWN-5:CLONER_LEFT:CLONER_DOWN:BASALT:CLONER_LEFT:BASALT:OBSIDIAN-9:BASALT:CLONER_RIGHT:BASALT:CLONER_DOWN:CLONER_RIGHT:CLONER_DOWN-5:SLIDER_VERTICAL:DELETER:AIR-1v:DELETER:SLIDER_VERTICAL:CLONER_DOWN-5:CLONER_LEFT:CLONER_DOWN:BASALT:CLONER_LEFT:BASALT:OBSIDIAN-9:BASALT:CLONER_RIGHT:BASALT:CLONER_DOWN:CLONER_RIGHT:CLONER_DOWN-5:SLIDER_VERTICAL:DELETER:AIR-1v:DELETER:SLIDER_VERTICAL:CLONER_DOWN-5:CLONER_LEFT:CLONER_DOWN:BASALT:CLONER_LEFT:BASALT:OBSIDIAN-9:BASALT:CLONER_RIGHT:BASALT:CLONER_DOWN:CLONER_RIGHT:CLONER_DOWN-5:SLIDER_VERTICAL:DELETER:AIR-1v:DELETER:SLIDER_VERTICAL:CLONER_DOWN-5:CLONER_LEFT:CLONER_DOWN:BASALT:CLONER_LEFT:BASALT-b:CLONER_RIGHT:BASALT:CLONER_DOWN:CLONER_RIGHT:CLONER_DOWN-5:SLIDER_VERTICAL:DELETER:AIR-1v:DELETER:SLIDER_VERTICAL:CLONER_DOWN-5:CLONER_LEFT:CLONER_DOWN:OBSIDIAN-2:CLONER_DOWN-b:OBSIDIAN-2:CLONER_DOWN:CLONER_RIGHT:CLONER_DOWN-5:SLIDER_VERTICAL:DELETER:AIR-1v:DELETER:SLIDER_VERTICAL:CLONER_DOWN-5:CLONER_LEFT:CLONER_DOWN:OBSIDIAN-2:BASALT-b:OBSIDIAN-2:CLONER_DOWN:CLONER_RIGHT:CLONER_DOWN-5:SLIDER_VERTICAL:DELETER:AIR-1v:DELETER:SLIDER_VERTICAL:CLONER_DOWN-5:OBSIDIAN-2:CLONER_LEFT-7:BASALT:CLONER_RIGHT-7:OBSIDIAN-2:CLONER_DOWN-5:SLIDER_VERTICAL:DELETER:AIR-1w:DELETER:SLIDER_HORIZONTAL-5:OBSIDIAN-2:CLONER_DOWN-f:OBSIDIAN-2:SLIDER_HORIZONTAL-5:DELETER:AIR-1y:DELETER:OBSIDIAN-4:SLIDER_VERTICAL:CLONER_LEFT-8:BASALT:CLONER_RIGHT-8:SLIDER_VERTICAL:OBSIDIAN-4:DELETER:AIR-1z:DELETER:OBSIDIAN-4:SLIDER_VERTICAL:CLONER_LEFT-8:BASALT:CLONER_RIGHT-8:SLIDER_VERTICAL:OBSIDIAN-4:DELETER:AIR-1z:DELETER:OBSIDIAN-4:SLIDER_VERTICAL:CLONER_LEFT-8:BASALT:CLONER_RIGHT-8:SLIDER_VERTICAL:OBSIDIAN-4:DELETER:AIR-1z:DELETER:OBSIDIAN-4:SLIDER_VERTICAL:CLONER_LEFT-8:BASALT:CLONER_RIGHT-8:SLIDER_VERTICAL:OBSIDIAN-4:DELETER:AIR-1z:DELETER-5:SLIDER_VERTICAL:CLONER_LEFT-8:BASALT:CLONER_RIGHT-8:SLIDER_VERTICAL:DELETER-5:AIR-24:DELETER:SLIDER_HORIZONTAL-h:DELETER:AIR-2a:DELETER-h:AIR-241:AIR-7ps:1;23p:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:18:1k:1hb:",
        pixelInventory: {
            all: 1000000,
            ignitor_launcher_left: -1000000,
            ignitor_launcher_right: -1000000,
            ignitor_launcher_up: -1000000,
            ignitor_launcher_down: -1000000,
            frost_ignitor_launcher_left: -1000000,
            frost_ignitor_launcher_right: -1000000,
            frost_ignitor_launcher_up: -1000000,
            frost_ignitor_launcher_down: -1000000,
        },
        name: "Vault 2",
        description: "even better",
    },
    "4rings": {
        saveCode: "100;air-3837:obsidian-3:slider_horizontal-27:obsidian-3:air-67:obsidian-3:swapper_vertical-27:obsidian-3:air-67:obsidian-3:slider_horizontal-27:obsidian-3:air-67:slider_vertical:swapper_horizontal:slider_vertical:obsidian-3:deleter-21:obsidian-3:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:obsidian-3:cloner_up-21:obsidian-3:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:obsidian-3:basalt-21:obsidian-3:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:obsidian-3:deleter-15:obsidian-3:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:obsidian-3:cloner_up-15:obsidian-3:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:obsidian-3:basalt-15:obsidian-3:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:deleter:cloner_left:basalt:obsidian-3:deleter-9:obsidian-3:basalt:cloner_right:deleter:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:deleter:cloner_left:basalt:obsidian-3:cloner_up-9:obsidian-3:basalt:cloner_right:deleter:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:deleter:cloner_left:basalt:obsidian-3:basalt-9:obsidian-3:basalt:cloner_right:deleter:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:deleter:cloner_left:basalt:deleter:cloner_left:basalt:obsidian-9:basalt:cloner_right:deleter:basalt:cloner_right:deleter:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:deleter:cloner_left:basalt:deleter:cloner_left:basalt:obsidian-9:basalt:cloner_right:deleter:basalt:cloner_right:deleter:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:deleter:cloner_left:basalt:deleter:cloner_left:basalt:obsidian-9:basalt:cloner_right:deleter:basalt:cloner_right:deleter:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:deleter:cloner_left:basalt:deleter:cloner_left:basalt:obsidian-3:monster-3:obsidian-3:basalt:cloner_right:deleter:basalt:cloner_right:deleter:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:deleter:cloner_left:basalt:deleter:cloner_left:basalt:obsidian-3:monster-3:obsidian-3:basalt:cloner_right:deleter:basalt:cloner_right:deleter:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:deleter:cloner_left:basalt:deleter:cloner_left:basalt:obsidian-3:monster-3:obsidian-3:basalt:cloner_right:deleter:basalt:cloner_right:deleter:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:deleter:cloner_left:basalt:deleter:cloner_left:basalt:obsidian-9:basalt:cloner_right:deleter:basalt:cloner_right:deleter:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:deleter:cloner_left:basalt:deleter:cloner_left:basalt:obsidian-9:basalt:cloner_right:deleter:basalt:cloner_right:deleter:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:deleter:cloner_left:basalt:deleter:cloner_left:basalt:obsidian-9:basalt:cloner_right:deleter:basalt:cloner_right:deleter:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:deleter:cloner_left:basalt:obsidian-3:basalt-9:obsidian-3:basalt:cloner_right:deleter:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:deleter:cloner_left:basalt:obsidian-3:cloner_down-9:obsidian-3:basalt:cloner_right:deleter:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:deleter:cloner_left:basalt:obsidian-3:deleter-9:obsidian-3:basalt:cloner_right:deleter:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:obsidian-3:basalt-15:obsidian-3:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:obsidian-3:cloner_down-15:obsidian-3:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:deleter:cloner_left:basalt:obsidian-3:deleter-15:obsidian-3:basalt:cloner_right:deleter:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:obsidian-3:basalt-21:obsidian-3:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:obsidian-3:cloner_down-21:obsidian-3:slider_vertical:swapper_horizontal:slider_vertical:air-67:slider_vertical:swapper_horizontal:slider_vertical:obsidian-3:deleter-21:obsidian-3:slider_vertical:swapper_horizontal:slider_vertical:air-67:obsidian-3:slider_horizontal-27:obsidian-3:air-67:obsidian-3:swapper_vertical-27:obsidian-3:air-67:obsidian-3:slider_horizontal-27:obsidian-3:air-2930:air-10000:1;3837:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:67:33:2930:",
        pixelInventory: {
            all: 1000000,
        },
        name: "4 Rings",
        description: "lots of buhsalt",
    },
    "impossible": {
        saveCode: "100;AIR-2yl:OBSIDIAN:DELETER-v:OBSIDIAN:AIR-1v:DELETER:OBSIDIAN:BASALT-6:CLONER_LEFT:BASALT-f:CLONER_RIGHT:BASALT-6:OBSIDIAN:DELETER:AIR-1v:DELETER:BASALT:OBSIDIAN:BASALT-5:CLONER_LEFT:BASALT-f:CLONER_RIGHT:BASALT-5:OBSIDIAN:BASALT:DELETER:AIR-1v:DELETER:BASALT-2:OBSIDIAN:BASALT-4:CLONER_LEFT:BASALT-f:CLONER_RIGHT:BASALT-4:OBSIDIAN:BASALT-2:DELETER:AIR-1v:DELETER:BASALT-3:OBSIDIAN:BASALT-3:CLONER_LEFT:BASALT-f:CLONER_RIGHT:BASALT-3:OBSIDIAN:BASALT-3:DELETER:AIR-1v:DELETER:BASALT-4:OBSIDIAN:BASALT-2:CLONER_LEFT:BASALT-f:CLONER_RIGHT:BASALT-2:OBSIDIAN:BASALT-4:DELETER:AIR-1v:DELETER:BASALT-5:OBSIDIAN:BASALT:CLONER_UP-h:BASALT:OBSIDIAN:BASALT-5:DELETER:AIR-1v:DELETER:BASALT-6:OBSIDIAN:CLONER_LEFT:BASALT-f:CLONER_RIGHT:OBSIDIAN:BASALT-6:DELETER:AIR-1v:DELETER:CLONER_UP-5:CLONER_LEFT:CLONER_UP-5:CLONER_RIGHT-d:CLONER_DOWN:CLONER_RIGHT:CLONER_DOWN-5:DELETER:AIR-1v:DELETER:BASALT-5:CLONER_LEFT:BASALT:CLONER_UP-4:CLONER_RIGHT-d:BASALT:CLONER_RIGHT:BASALT-5:DELETER:AIR-1v:DELETER:BASALT-5:CLONER_LEFT:BASALT:CLONER_UP-7:CLONER_RIGHT-a:BASALT:CLONER_RIGHT:BASALT-5:DELETER:AIR-1v:DELETER:BASALT-5:CLONER_LEFT:BASALT:CLONER_UP-4:CLONER_RIGHT-d:BASALT:CLONER_RIGHT:BASALT-5:DELETER:AIR-1v:DELETER:BASALT-5:CLONER_LEFT:BASALT:CLONER_UP-5:CLONER_LEFT:CLONER_UP:CLONER_RIGHT-6:CLONER_DOWN:CLONER_RIGHT:CLONER_DOWN-2:BASALT:CLONER_RIGHT:BASALT-5:DELETER:AIR-1v:DELETER:BASALT-5:CLONER_LEFT:BASALT:CLONER_UP-5:CLONER_LEFT:CLONER_UP-7:CLONER_DOWN:CLONER_RIGHT:CLONER_DOWN-2:BASALT:CLONER_RIGHT:BASALT-5:DELETER:AIR-1v:DELETER:BASALT-5:CLONER_LEFT:BASALT:CLONER_UP-5:CLONER_LEFT:CLONER_UP:CLONER_RIGHT-6:CLONER_DOWN:CLONER_RIGHT:CLONER_DOWN-2:BASALT:CLONER_RIGHT:BASALT-5:DELETER:AIR-1v:DELETER:BASALT-5:CLONER_LEFT:BASALT:CLONER_UP-5:CLONER_LEFT:CLONER_UP:OBSIDIAN-3:CLONER_DOWN:CLONER_RIGHT:CLONER_DOWN-5:BASALT:CLONER_RIGHT:BASALT-5:DELETER:AIR-1v:DELETER:BASALT-5:CLONER_LEFT:BASALT:CLONER_UP-5:CLONER_LEFT:CLONER_UP:OBSIDIAN:MONSTER:OBSIDIAN:CLONER_DOWN:CLONER_RIGHT:CLONER_DOWN-5:BASALT:CLONER_RIGHT:BASALT-5:DELETER:AIR-1v:DELETER:BASALT-5:CLONER_LEFT:BASALT:CLONER_UP-5:CLONER_LEFT:CLONER_UP:OBSIDIAN-3:CLONER_DOWN:CLONER_RIGHT:CLONER_DOWN-5:BASALT:CLONER_RIGHT:BASALT-5:DELETER:AIR-1v:DELETER:BASALT-5:CLONER_LEFT:BASALT:CLONER_UP-2:CLONER_LEFT:CLONER_UP:CLONER_LEFT-6:CLONER_DOWN:CLONER_RIGHT:CLONER_DOWN-5:BASALT:CLONER_RIGHT:BASALT-5:DELETER:AIR-1v:DELETER:BASALT-5:CLONER_LEFT:BASALT:CLONER_UP-2:CLONER_LEFT:CLONER_UP:CLONER_DOWN-7:CLONER_RIGHT:CLONER_DOWN-5:BASALT:CLONER_RIGHT:BASALT-5:DELETER:AIR-1v:DELETER:BASALT-5:CLONER_LEFT:BASALT:CLONER_UP-2:CLONER_LEFT:CLONER_UP:CLONER_LEFT-6:CLONER_DOWN:CLONER_RIGHT:CLONER_DOWN-5:BASALT:CLONER_RIGHT:BASALT-5:DELETER:AIR-1v:DELETER:BASALT-5:CLONER_LEFT:BASALT:CLONER_LEFT-d:CLONER_DOWN-4:BASALT:CLONER_RIGHT:BASALT-5:DELETER:AIR-1v:DELETER:BASALT-5:CLONER_LEFT:BASALT:CLONER_LEFT-a:CLONER_DOWN-7:BASALT:CLONER_RIGHT:BASALT-5:DELETER:AIR-1v:DELETER:BASALT-5:CLONER_LEFT:BASALT:CLONER_LEFT-d:CLONER_DOWN-4:BASALT:CLONER_RIGHT:BASALT-5:DELETER:AIR-1v:DELETER:CLONER_DOWN-5:CLONER_LEFT:CLONER_DOWN:CLONER_LEFT-d:CLONER_DOWN-5:CLONER_RIGHT:CLONER_DOWN-5:DELETER:AIR-1v:DELETER:BASALT-6:OBSIDIAN:CLONER_LEFT:BASALT-f:CLONER_RIGHT:OBSIDIAN:BASALT-6:DELETER:AIR-1v:DELETER:BASALT-5:OBSIDIAN:BASALT:CLONER_DOWN-h:BASALT:OBSIDIAN:BASALT-5:DELETER:AIR-1v:DELETER:BASALT-4:OBSIDIAN:BASALT-2:CLONER_LEFT:BASALT-f:CLONER_RIGHT:BASALT-2:OBSIDIAN:BASALT-4:DELETER:AIR-1v:DELETER:BASALT-3:OBSIDIAN:BASALT-3:CLONER_LEFT:BASALT-f:CLONER_RIGHT:BASALT-3:OBSIDIAN:BASALT-3:DELETER:AIR-1v:DELETER:BASALT-2:OBSIDIAN:BASALT-4:CLONER_LEFT:BASALT-f:CLONER_RIGHT:BASALT-4:OBSIDIAN:BASALT-2:DELETER:AIR-1v:DELETER:BASALT:OBSIDIAN:BASALT-5:CLONER_LEFT:BASALT-f:CLONER_RIGHT:BASALT-5:OBSIDIAN:BASALT:DELETER:AIR-1v:DELETER:OBSIDIAN:BASALT-6:CLONER_LEFT:BASALT-f:CLONER_RIGHT:BASALT-6:OBSIDIAN:DELETER:AIR-1v:OBSIDIAN:DELETER-v:OBSIDIAN:AIR-29e:AIR-7ps:1;2yl:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:1v:x:29e:",
        pixelInventory: {
            all: 1000000,
        },
        name: "impossible",
        description: "impossible",
    },
    "reflector_vault": {
        saveCode: "100;air-4565:reflector_vertical:reflector_horizontal:air-97:reflector_vertical:obsidian-2:reflector_horizontal:air-95:reflector_vertical:obsidian:cloner_up:cloner_right:obsidian:reflector_horizontal:air-93:reflector_vertical:obsidian:cloner_up-2:cloner_right-2:obsidian:reflector_horizontal:air-91:reflector_vertical:obsidian:cloner_up-2:obsidian-2:cloner_right-2:obsidian:reflector_horizontal:air-89:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-2:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-87:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-4:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-85:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-2:rotator_clockwise-2:deleter-2:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-83:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-2:rotator_clockwise:obsidian-2:rotator_clockwise:deleter-2:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-81:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-2:rotator_clockwise:obsidian-4:rotator_clockwise:deleter-2:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-79:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-2:rotator_clockwise:obsidian:cloner_up-4:obsidian:rotator_clockwise:deleter-2:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-77:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-2:rotator_clockwise:obsidian-2:cloner_up-4:obsidian-2:rotator_clockwise:deleter-2:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-75:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-2:rotator_clockwise:obsidian:cloner_left-2:obsidian-4:cloner_right-2:obsidian:rotator_clockwise:deleter-2:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-73:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-2:rotator_clockwise:obsidian-2:cloner_left-2:obsidian:monster-2:obsidian:cloner_right-2:obsidian-2:rotator_clockwise:deleter-2:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-72:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-2:rotator_clockwise:obsidian-2:cloner_left-2:obsidian:monster-2:obsidian:cloner_right-2:obsidian-2:rotator_clockwise:deleter-2:obsidian:cloner_down-2:obsidian:reflector_vertical:air-73:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-2:rotator_clockwise:obsidian:cloner_left-2:obsidian-4:cloner_right-2:obsidian:rotator_clockwise:deleter-2:obsidian:cloner_down-2:obsidian:reflector_vertical:air-75:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-2:rotator_clockwise:obsidian-2:cloner_down-4:obsidian-2:rotator_clockwise:deleter-2:obsidian:cloner_down-2:obsidian:reflector_vertical:air-77:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-2:rotator_clockwise:obsidian:cloner_down-4:obsidian:rotator_clockwise:deleter-2:obsidian:cloner_down-2:obsidian:reflector_vertical:air-79:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-2:rotator_clockwise:obsidian-4:rotator_clockwise:deleter-2:obsidian:cloner_down-2:obsidian:reflector_vertical:air-81:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-2:rotator_clockwise:obsidian-2:rotator_clockwise:deleter-2:obsidian:cloner_down-2:obsidian:reflector_vertical:air-83:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-2:rotator_clockwise-2:deleter-2:obsidian:cloner_down-2:obsidian:reflector_vertical:air-85:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-4:obsidian:cloner_down-2:obsidian:reflector_vertical:air-87:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-2:obsidian:cloner_down-2:obsidian:reflector_vertical:air-89:reflector_horizontal:obsidian:cloner_left-2:obsidian-2:cloner_down-2:obsidian:reflector_vertical:air-91:reflector_horizontal:obsidian:cloner_left-2:cloner_down-2:obsidian:reflector_vertical:air-93:reflector_horizontal:obsidian:cloner_left:cloner_down:obsidian:reflector_vertical:air-95:reflector_horizontal:obsidian-2:reflector_vertical:air-97:reflector_horizontal:reflector_vertical:air-2733:air-10000:1;2935:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:35:65:",
        pixelInventory: {
            all: 1000000,
        },
        name: "noLASERSplz",
        description: "oof",
    },
    "actually_impossilbe": {
        saveCode: "100;SAD_MONSTER-7ps:AIR-7ps:0;7ps:",
        pixelInventory: {
            placeable: 9999,
        },
        name: "actually_impossilbe",
        description: "LOL",
    },
    "nuked": {
        saveCode: "100;air-4763:deleter-15:air-85:deleter:air-13:deleter:air-85:deleter:air-13:deleter:air-85:deleter:air-13:deleter:air-85:deleter:air-5:rotator_clockwise:cloner_left:cloner_up:air-5:deleter:air-85:deleter:air-5:rotator_clockwise:cloner_left:cloner_up:air-5:deleter:air-85:deleter:air-3:cloner_left-2:obsidian-3:rotator_counter_clockwise-2:air-3:deleter:air-85:deleter:air-3:cloner_down-2:obsidian:monster:obsidian:cloner_up-2:air-3:deleter:air-85:deleter:air-3:rotator_counter_clockwise-2:obsidian-3:cloner_right-2:air-3:deleter:air-85:deleter:air-5:cloner_down:cloner_right:rotator_clockwise:air-5:deleter:air-85:deleter:air-5:cloner_down:cloner_right:rotator_clockwise:air-5:deleter:air-85:deleter:air-13:deleter:air-85:deleter:air-13:deleter:air-85:deleter:air-13:deleter:air-85:deleter-15:air-3822:air-10000:1;3042:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:42:58:2200:",
        pixelInventory: {
            all: 1000000,
        },
        name: "nuked",
        description: "BUH",
    },
    "box": {
        saveCode: "20;air-9:obsidian:cloner_right:obsidian:ignitor_right:ignitor_laser_right:air-15:obsidian:cloner_right:obsidian:deleter:obsidian:air-15:obsidian:cloner_right:obsidian:deleter:obsidian:air-15:obsidian:cloner_right:obsidian:deleter:obsidian:air-15:obsidian:cloner_right:obsidian:deleter:obsidian:air-15:obsidian:cloner_right:obsidian:deleter:obsidian:air-15:obsidian:cloner_right:obsidian:deleter:obsidian-7:air-9:obsidian:cloner_right:obsidian:deleter-8:air-9:obsidian:cloner_right:obsidian-9:air-9:obsidian:deleter:cloner_up-9:air-9:obsidian-11:air-173:monster:air-6:air-400:0;16:4:16:4:16:4:16:4:320:",
        pixelInventory: {
            fire: 1,
            frost_fire: 1,
            cloner_left: 1,
            cloner_right: 1,
            cloner_up: 1,
            cloner_down: 1,
            piston_left: 1,
            piston_right: 1,
            piston_up: 1,
            piston_down: 1,
            rotator_clockwise: 1,
            rotator_counter_clockwise: 1,
            alternator: 1,
            deleter: 1,
            swapper_horizontal: 1,
            swapper_vertical: 1,
            reflector_horizontal: 1,
            reflector_vertical: 1,
            ignitor_left: 1,
            ignitor_right: 1,
            ignitor_up: 1,
            ignitor_down: 1,
            frost_ignitor_left: 1,
            frost_ignitor_right: 1,
            frost_ignitor_up: 1,
            frost_ignitor_down: 1,
        },
        name: "box",
        description: "idk",
    },
};

for (var i in levels) {
    for (var j in levels[i].pixelInventory) {
        if (j == "all") {
            continue;
        }
        levels[i].pixelInventory[eval(j.toUpperCase())] = levels[i].pixelInventory[j];
        delete levels[i].pixelInventory[j];
    }
}