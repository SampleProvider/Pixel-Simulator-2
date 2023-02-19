var currentLevel = null;
var levels = {
    "1-1": {
        saveCode: "20;air-180:leaf:air-19:leaf-2:air-18:wood:air-18:sand:wood:air-18:grass-4:air-15:monster:grass:dirt-2:grass:water-10:air-4:grass-3:dirt-2:mud-2:water-12:grass-2:dirt-5:mud-5:water-4:mud-5:dirt-10:mud-6:dirt-47:air-400:false-400:",
        pixelInventory: {},
        name: "A Pixel World",
        description: "Welcome to Pixel Simulator 2! The pixel grid is on the left of the screen. The sidebar is either on the  right or the bottom. If you have a pixel in your inventory, you can select it by clicking on the pixel in the pixel picker. You can select Air or right click to remove pixels. <b>Run</b> runs the simulation at 60 FPS. <b>Step</b> runs 1 tick. <b>Simulate</b> allows you to speed up the simulation. <b>Reset</b> resets the grid to the original state before running. You cannot edit the grid unless it is in the original state. Click <b>Run</b> to continue.",
    },
    "1-2": {
        saveCode: "20;air-149:leaf-3:air-16:leaf-5:air-15:leaf-2:wood:leaf-2:air-17:wood:air-20:wood:air-8:grass:air-10:wood:air-8:grass-2:monster-3:grass-4:air-2:wood:air-8:grass-12:mud:water-7:dirt-12:mud-8:dirt-80:air-400:false-61:true:false:true:false-2:true:false-333:",
        pixelInventory: {
            dirt: 1,
            sand: 1,
            water: 1,
        },
        name: "Dirty Water",
        description: "Dirt and Grass fall downwards unless there are at least 4 pixels touching them. Sand falls and will fall 1 tile sideways if there is a pixel underneath it. Water will fall and move left and right to reach the lowest altitude. Place these pixels on the shaded tiles and destroy all the monsters to win!",
    },
    "1-3": {
        saveCode: "20;air-44:water:air:water:air-4:water:air-43:leaf-3:air-16:leaf-5:monster:air-10:leaf-2:air:leaf-7:air-9:leaf-3:air:leaf-3:wood:leaf-3:air-6:leaf-2:air:leaf:wood:leaf:air-2:leaf-2:wood-2:air-8:leaf:wood:air:wood:air-6:wood-2:air-4:leaf-3:air-3:wood-2:air-6:wood-2:air-3:leaf-5:air-3:wood:air-6:wood-3:air-2:leaf-5:air-3:wood:air-7:wood-2:air-4:wood:air-5:wood:air-7:wood-2:grass:air-3:wood:air-5:wood:air-7:grass:dirt-2:air:monster:air:wood:air-2:monster:air-2:wood:air-6:grass-2:dirt-2:grass-8:air:wood:air-2:monster:grass-4:dirt-10:grass-6:dirt-47:air-400:false-50:true:false:true-3:false-5:true-8:false-3:true-4:false-5:true-8:false-6:true:false-5:true-8:false-12:true-5:false-15:true-5:false-15:true-5:false-15:true-5:false-215:",
        pixelInventory: {
            sand: 1,
            wood: 2,
            leaf: 6,
            sapling: 1,
        },
        name: "Wood Forest",
        description: "Wood is solid and will not fall. Leaves also don't fall. If a Leaf is not touching Wood and is touching less than 2 other Leaf pixels, it will decay. Leaves have a 10% chance to decay into a Sapling. Saplings will fall downwards and can grow trees.",
    },
    "1-4": {
        saveCode: "20;air-45:water:air-19:wood-2:air-17:dried_mud:air-18:dried_mud:air-6:grass-3:air-8:dried_mud-2:air-5:grass-3:dirt:grass-2:air-13:grass-2:dirt-3:grass-2:air-13:grass-2:dirt-3:grass:air-15:grass:dirt-3:grass:air-15:grass-2:dirt:grass-2:air-16:grass-3:air-54:monster:air-7:monster:air-5:monster:grass:air-4:monster-2:air-5:monster-2:air-4:grass:monster:grass-2:air-2:monster-2:air-6:monster-3:air-2:grass-2:monster:dirt:grass-4:monster:air-5:monster:grass-6:dirt:monster:dirt-4:grass-6:air:monster:grass:dirt-6:monster:dirt-9:grass-3:dirt-7:air-400:false-8:true-6:false-14:true-6:false-12:true:false:true-6:false-14:true-6:false-11:true:false-2:true-6:false-10:true:false-18:true:false-17:true-2:false-257:",
        pixelInventory: {
            sand: 1,
            water: 2,
            wood: 1,
            leaf: 4,
        },
        name: "Mud Landslide",
        description: "Water will turn touching Dirt into Mud. Mud flows like water unless there are at least 5 pixels touching it. When flowing, Mud will only search 4 tiles to its left and right for a spot of lower elevation. If Mud is not touching Water, it will dry into a Dry Mud. Dry Mud can turn back into Mud if it touches Water. Dry Mud will fall unless there are at least 3 pixels touching it.",
    },
    "1-5": {
        saveCode: "20;air-43:grass-4:air-16:grass-4:air-17:grass-2:air-101:monster-2:air-17:leaf-3:air-16:leaf-5:air-15:leaf-2:wood:leaf-2:air-17:wood:air-5:leaf-3:air-3:leaf:air-6:wood:air-5:monster:leaf-4:air:leaf-2:air-2:monster:air-3:wood:air-5:leaf-2:wood:leaf-2:air:leaf-2:grass-3:air-3:wood:air-7:wood:air-4:wood:dirt-2:grass-2:monster:grass-2:air-7:wood:air-4:wood:dirt-6:grass-2:monster:grass-6:monster:grass:monster:grass:dirt-21:air-400:false-47:true:false-9:true:false-4:true:false-4:true:false-45:true:false-3:true:false-4:true:false-8:true:false-45:true:false-222:",
        pixelInventory: {
            dirt: 1,
            grass: 1,
            sand: 5,
            water: 2,
        },
        name: "Tricky Choice",
        description: "These are all the pixels in A Pixel World! Try some levels on your own!",
    },
    "1-6": {
        saveCode: "20;air-30:sand:air-10:sand-5:air-3:sand-3:air-8:sand-12:air-2:grass-2:air-4:sand-12:air-2:grass-6:sand-12:air-2:grass-2:dirt-4:wood:air:wood:air:wood:sand-6:wood:air-3:grass-5:air-5:wood:air-2:wood:air:wood:air-6:grass-2:air-93:monster:air-4:monster-2:air:monster:air:monster:air-9:monster:air-3:monster-8:air:monster-3:air-3:monster-2:air-2:monster-3:air:monster:dirt-3:grass:monster-10:air:monster:dirt-17:grass-3:dirt-64:air-400:false-13:true-7:false-13:true-7:false-72:true:false-8:true:false:true:false-22:true-2:false:true:false-250:",
        pixelInventory: {
            water: 2,
            wood: 3,
        },
        name: "Monster Ocean",
        description: "Uhh, there seem to be a lot of monsters here! How could we destroy all of them with just 5 pixels?",
    },
    "2-1": {
        saveCode: "20;air-205:wood-2:air-17:wood-4:air-15:wood-6:air-6:wood-2:air-5:wood-2:air-4:wood-2:air-4:wood-4:air-5:wood:air:monster:air-2:wood:air-4:wood-2:air-2:wood-2:air-4:wood:monster-2:air:monster:wood:air-5:wood:air:monster:wood:air:grass-11:air-4:wood:monster:air:wood:grass-2:dirt-9:grass-9:dirt-42:air-400:false-144:true:false-255:",
        pixelInventory: {
            lava: 1,
        },
        name: "Volcanic Destruction",
        description: "The monsters built houses to protect them! How can we break in? I wonder if Wood is flammable...",
    },
    "2-2": {
        saveCode: "20;air-194:basalt-2:obsidian-2:basalt:air-4:obsidian-2:basalt-2:obsidian:air-5:obsidian-2:wood-3:basalt:obsidian:air-2:basalt-2:wood-3:obsidian:basalt:air-3:obsidian:basalt:wood-2:air:wood-2:obsidian:air:obsidian-2:wood-2:air:wood-2:basalt:obsidian:air-2:basalt:wood-2:air-3:wood-2:air:basalt:wood-2:air-3:wood-2:basalt:air-2:basalt:obsidian:wood:air-2:monster:wood:air-2:obsidian:basalt:wood:air-2:monster:wood:obsidian:basalt:air-3:basalt:wood:monster-3:wood:air:grass-4:monster-2:air:wood:basalt:air-4:obsidian:wood:air:grass-4:dirt-3:grass-5:obsidian:air-3:grass-5:dirt-10:grass-6:dirt-47:air-400:true-100:false-300:",
        pixelInventory: {
            lava: 1,
        },
        name: "Rocky Shells",
        description: "Water can cool Lava into Stone, Basalt, and Obsidian! The more Lava surrounding the Lava when it cools, the stronger the rock it cools into! Obsidian is the strongest rock, followed by Basalt, then Stone. These rocks are immune to fire, but not to Lava. How can you get in to their houses now?",
    },
    "2-3": {
        saveCode: "20;air-242:wood-3:air-3:obsidian:basalt:obsidian:air-8:basalt:wood-7:air:obsidian:water:basalt:lava-8:basalt:air:wood:air-3:wood:air-2:basalt:water:obsidian-2:lava-8:air:wood:monster:air:monster:wood:air-2:obsidian:water:obsidian:lava-9:grass-3:monster-2:wood:air-2:obsidian:water:obsidian:lava-9:dirt-2:grass-3:wood:air-2:basalt:water:obsidian:lava-9:dirt-4:grass-4:obsidian:water:basalt:obsidian:lava-8:dirt-8:basalt:water:obsidian-2:lava-8:air-400:false-80:true-10:false-10:true-11:false-9:true-12:false-16:true-5:false-16:true-11:false-10:true-10:false-11:true-9:false-180:",
        pixelInventory: {
            wood: 5,
            leaf: 12,
        },
        name: "Burnt Ash",
        description: "The monsters built a wall to protect them from the Lava! Fire is less dense than air, and will move upwards. There is a 25% chance for pixels to turn into Ash after being burnt. Ash turns into Silt once touching Water. How do we get the fire over the wall?",
    },
    "vault": {
        saveCode: "50;air-932:wood:air-8:wood:air-39:wood:explosives:rotator_clockwise-8:explosives:wood:air-39:rotator_clockwise:explosives:obsidian-6:explosives:rotator_clockwise:air-40:rotator_clockwise:obsidian:explosives:obsidian-4:explosives:obsidian:rotator_clockwise:air-40:rotator_clockwise:obsidian-2:explosives:obsidian-2:explosives:obsidian-2:rotator_clockwise:air-40:rotator_clockwise:obsidian-3:monster-2:obsidian-3:rotator_clockwise:air-40:rotator_clockwise:obsidian-3:monster-2:obsidian-3:rotator_clockwise:air-40:rotator_clockwise:obsidian-2:explosives:obsidian-2:explosives:obsidian-2:rotator_clockwise:air-40:rotator_clockwise:obsidian:explosives:obsidian-4:explosives:obsidian:rotator_clockwise:air-40:rotator_clockwise:explosives:obsidian-6:explosives:rotator_clockwise:air-39:wood:explosives:rotator_clockwise-8:explosives:wood:air-39:wood:air-8:wood:air-1008:air-2500:false-857:true-6:false-44:true-6:false-44:true-6:false-44:true-6:false-44:true-6:false-44:true-6:false-1387:",
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
        saveCode: "100;air-5138:deleter-29:air-66:deleter-5:cloner_right-29:deleter-5:air-61:deleter-5:cloner_right-29:deleter-5:air-61:deleter-5:cloner_right-29:deleter-5:air-61:deleter-5:cloner_right-29:deleter-5:air-61:deleter-5:cloner_right-29:deleter-5:air-60:deleter:cloner_up-7:deleter-4:cloner_up-2:deleter-4:cloner_up-5:deleter-4:cloner_up-2:deleter:cloner_up-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_right-26:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter-27:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-23:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-23:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter-19:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-2:deleter:obsidian-17:deleter:obsidian-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-2:deleter:obsidian-17:deleter:obsidian-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter:obsidian-17:deleter:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter-11:obsidian-3:deleter:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter:obsidian-9:deleter:obsidian-3:deleter:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter:obsidian-9:deleter:obsidian-3:deleter:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter:obsidian-2:air-5:obsidian-2:deleter:obsidian-3:deleter:obsidian-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter:obsidian-2:air-2:monster:air-2:obsidian-2:deleter:obsidian-3:deleter:obsidian-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter:obsidian-2:air:wood-3:air:obsidian-2:deleter:obsidian-3:deleter:obsidian-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter:obsidian-2:air-2:wood:air-2:obsidian-2:deleter:obsidian-3:deleter:obsidian-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter:obsidian-9:deleter:obsidian-3:deleter:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter:obsidian-9:deleter:obsidian-3:deleter:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter:obsidian-3:deleter-11:obsidian-3:deleter:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter:obsidian-17:deleter:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-2:deleter:obsidian-17:deleter:obsidian-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:obsidian-2:deleter:obsidian-17:deleter:obsidian-2:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-2:deleter-19:obsidian-2:deleter:cloner_down:deleter:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-23:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter:obsidian-23:deleter:cloner_down:cloner_right:cloner_down-5:deleter:air-59:deleter:cloner_up-5:deleter:cloner_up:deleter-27:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:cloner_left-26:cloner_down-5:deleter:air-59:deleter:cloner_up-5:cloner_left:cloner_up:deleter:cloner_down-2:deleter:cloner_down-2:deleter-4:cloner_down-5:deleter-4:cloner_down-2:deleter-4:cloner_down-7:deleter:air-60:deleter-5:cloner_left-29:deleter-5:air-61:deleter-5:cloner_left-29:deleter-5:air-61:deleter-5:cloner_left-29:deleter-5:air-61:deleter-5:cloner_left-29:deleter-5:air-61:deleter-5:cloner_left-29:deleter-5:air-66:deleter-29:air-933:air-10000:true-4320:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-37:false-63:true-17:",
        pixelInventory: {
            all: 1000000,
        },
        name: "OP VAULT",
        description: "sp head confirmed??",
    },
    "reflector_vault": {
        saveCode: "100;air-4565:reflector_vertical:reflector_horizontal:air-97:reflector_vertical:obsidian-2:reflector_horizontal:air-95:reflector_vertical:obsidian:cloner_up:cloner_right:obsidian:reflector_horizontal:air-93:reflector_vertical:obsidian:cloner_up-2:cloner_right-2:obsidian:reflector_horizontal:air-91:reflector_vertical:obsidian:cloner_up-2:obsidian-2:cloner_right-2:obsidian:reflector_horizontal:air-89:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-2:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-87:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-4:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-85:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-2:rotator_clockwise-2:deleter-2:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-83:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-2:rotator_clockwise:obsidian-2:rotator_clockwise:deleter-2:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-81:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-2:rotator_clockwise:obsidian-4:rotator_clockwise:deleter-2:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-79:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-2:rotator_clockwise:obsidian:cloner_up-4:obsidian:rotator_clockwise:deleter-2:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-77:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-2:rotator_clockwise:obsidian-2:cloner_up-4:obsidian-2:rotator_clockwise:deleter-2:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-75:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-2:rotator_clockwise:obsidian:cloner_left-2:obsidian-4:cloner_right-2:obsidian:rotator_clockwise:deleter-2:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-73:reflector_vertical:obsidian:cloner_up-2:obsidian:deleter-2:rotator_clockwise:obsidian-2:cloner_left-2:obsidian:monster-2:obsidian:cloner_right-2:obsidian-2:rotator_clockwise:deleter-2:obsidian:cloner_right-2:obsidian:reflector_horizontal:air-72:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-2:rotator_clockwise:obsidian-2:cloner_left-2:obsidian:monster-2:obsidian:cloner_right-2:obsidian-2:rotator_clockwise:deleter-2:obsidian:cloner_down-2:obsidian:reflector_vertical:air-73:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-2:rotator_clockwise:obsidian:cloner_left-2:obsidian-4:cloner_right-2:obsidian:rotator_clockwise:deleter-2:obsidian:cloner_down-2:obsidian:reflector_vertical:air-75:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-2:rotator_clockwise:obsidian-2:cloner_down-4:obsidian-2:rotator_clockwise:deleter-2:obsidian:cloner_down-2:obsidian:reflector_vertical:air-77:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-2:rotator_clockwise:obsidian:cloner_down-4:obsidian:rotator_clockwise:deleter-2:obsidian:cloner_down-2:obsidian:reflector_vertical:air-79:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-2:rotator_clockwise:obsidian-4:rotator_clockwise:deleter-2:obsidian:cloner_down-2:obsidian:reflector_vertical:air-81:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-2:rotator_clockwise:obsidian-2:rotator_clockwise:deleter-2:obsidian:cloner_down-2:obsidian:reflector_vertical:air-83:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-2:rotator_clockwise-2:deleter-2:obsidian:cloner_down-2:obsidian:reflector_vertical:air-85:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-4:obsidian:cloner_down-2:obsidian:reflector_vertical:air-87:reflector_horizontal:obsidian:cloner_left-2:obsidian:deleter-2:obsidian:cloner_down-2:obsidian:reflector_vertical:air-89:reflector_horizontal:obsidian:cloner_left-2:obsidian-2:cloner_down-2:obsidian:reflector_vertical:air-91:reflector_horizontal:obsidian:cloner_left-2:cloner_down-2:obsidian:reflector_vertical:air-93:reflector_horizontal:obsidian:cloner_left:cloner_down:obsidian:reflector_vertical:air-95:reflector_horizontal:obsidian-2:reflector_vertical:air-97:reflector_horizontal:reflector_vertical:air-2733:air-10000:true-2935:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:true-35:false-65:",
        pixelInventory: {
            all: 1000000,
        },
        name: "noLASERSplz",
        description: "oof",
    },
    "nuked": {
        saveCode: "100;air-4763:deleter-15:air-85:deleter:air-13:deleter:air-85:deleter:air-13:deleter:air-85:deleter:air-13:deleter:air-85:deleter:air-5:rotator_clockwise:cloner_left:cloner_up:air-5:deleter:air-85:deleter:air-5:rotator_clockwise:cloner_left:cloner_up:air-5:deleter:air-85:deleter:air-3:cloner_left-2:obsidian-3:rotator_counter_clockwise-2:air-3:deleter:air-85:deleter:air-3:cloner_down-2:obsidian:monster:obsidian:cloner_up-2:air-3:deleter:air-85:deleter:air-3:rotator_counter_clockwise-2:obsidian-3:cloner_right-2:air-3:deleter:air-85:deleter:air-5:cloner_down:cloner_right:rotator_clockwise:air-5:deleter:air-85:deleter:air-5:cloner_down:cloner_right:rotator_clockwise:air-5:deleter:air-85:deleter:air-13:deleter:air-85:deleter:air-13:deleter:air-85:deleter:air-13:deleter:air-85:deleter-15:air-3822:air-10000:true-3042:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-42:false-58:true-2200:",
        pixelInventory: {
            all: 1000000,
        },
        name: "nuked",
        description: "BUH",
    },
    "box": {
        saveCode: "20;air-9:obsidian:cloner_right:obsidian:ignitor_right:ignitor_laser_right:air-15:obsidian:cloner_right:obsidian:deleter:obsidian:air-15:obsidian:cloner_right:obsidian:deleter:obsidian:air-15:obsidian:cloner_right:obsidian:deleter:obsidian:air-15:obsidian:cloner_right:obsidian:deleter:obsidian:air-15:obsidian:cloner_right:obsidian:deleter:obsidian:air-15:obsidian:cloner_right:obsidian:deleter:obsidian-7:air-9:obsidian:cloner_right:obsidian:deleter-8:air-9:obsidian:cloner_right:obsidian-9:air-9:obsidian:deleter:cloner_up-9:air-9:obsidian-11:air-173:monster:air-6:air-400:false-16:true-4:false-16:true-4:false-16:true-4:false-16:true-4:false-320:",
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
            deletor: 1,
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