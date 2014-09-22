/*global zebra, var2, var3 */
var userImage;

function rootInit() {


};

function newPanel() {
    return new zebra.ui.Panel();
};

function loVS() {
    return new zebra.layout.PercentLayout(zebra.layout.VERTICAL, 2, true);
};
var init = function init() {

};
init();

zebra.ready(
    function() {
        userImage = zebra.ui.loadImage("user.png");
    },
    function() {
        if (document.getElementById("doc.layout.percent1") !== null) {

            var c = new zebra.ui.zCanvas("doc.layout.percent1");
            c.fullScreen();
            var r = c.root;


            rootInit();
            //zebra.ui.Panel.setBackground("rgba(240,0,0,0.7)");
            
            r.setBorder(zebra.ui.borders.plain);

            r.setLayout(new zebra.layout.PercentLayout());
            var pl = newPanel(); //new zebra.ui.Panel();
            pl.setBorder(new zebra.ui.Border("red", 3));

            pl.setLayout(loVS());


            var p1top = newPanel(); //new zebra.ui.Panel();
            p1top.setLayout(loVS());

            var p1namelevel = newPanel(); //new zebra.ui.Panel();
            //p1namelevel.setPreferredSize(-1, 20);
            p1namelevel.setBorder(new zebra.ui.Border("green", 3));
            p1namelevel.setLayout(new zebra.layout.PercentLayout());

            var labelName = new zebra.ui.Label("Name");
            labelName.setFont(new zebra.ui.Font("Arial", "bold", 18));

            p1namelevel.add(50, labelName);

            var labelLevel = new zebra.ui.Label("Level");
            labelLevel.setFont(new zebra.ui.Font("Arial", "bold", 18));
            p1namelevel.add(50, labelLevel);


            var hp = new zebra.ui.Panel(new zebra.layout.FlowLayout(zebra.layout.CENTER, zebra.layout.CENTER, zebra.layout.HORIZONTAL, 16));
            var pr1 = new zebra.ui.Progress();
            //pr1.setPreferredSize(130, -1);
            pr1.setMaxValue(10);
            pr1.setValue(3);
            hp.add(new zebra.ui.Label("HP: "));
            hp.add(pr1);




            p1top.add(50, p1namelevel);
            p1top.add(50, hp);
            pl.add(15, p1top);



            var p1EquipPic = newPanel(); //new zebra.ui.Panel();

            p1EquipPic.setBorder(zebra.ui.borders.plain);
            p1EquipPic.setLayout(new zebra.layout.PercentLayout());

            var temp1a = new zebra.ui.Label("temp1a");
            temp1a.setFont(new zebra.ui.Font("Arial", "bold", 18));

            var ctr = new zebra.layout.Constraints();

            var p = newPanel(); //new zebra.ui.Panel();

            p.setBorder(zebra.ui.borders.plain);
            p.setLayout(new zebra.layout.GridLayout(2, 2, zebra.layout.VERTICAL | zebra.layout.HORIZONTAL));



            p.add(ctr, new zebra.ui.Button("1x1"));
            p.add(ctr, new zebra.ui.Button("1x2"));
            p.add(ctr, new zebra.ui.Button("2x1"));
            p.add(ctr, new zebra.ui.Button("2x2"));

            p1EquipPic.add(50, p);

            var temp1b = new zebra.ui.Label("temp1b");
            temp1b.setFont(new zebra.ui.Font("Arial", "bold", 18));

            var ctr2 = new zebra.layout.Constraints();

            var p2 = newPanel(); //new zebra.ui.Panel();

            p2.setBorder(zebra.ui.borders.plain);
            p2.setLayout(new zebra.layout.PercentLayout(zebra.layout.VERTICAL, 2, true));



            //var p1image = new zebra.ui.Picture(userImage, 180, 110, 60, 60);//new zebra.ui.Picture(userImage); 
            /*
            new zebra.ui.ImagePan("user.png").properties({ 
                                                        border : "plain",
                                                        visible: true, 
                                                        id     : "mapPan"
                                                    })

            */
            var p1image = newPanel(); //new zebra.ui.Panel();

            // set picture view as the component background
            p1image.setBackground(new zebra.ui.Picture(userImage));
            
            
            p2.add(50, p1image);
            
            p2.add(25, new zebra.ui.Button("b"));
            p2.add(25, new zebra.ui.Button("c"));


            p1EquipPic.add(50, p2);
            pl.add(25, p1EquipPic);

            pl.add(25, new zebra.ui.Button("20%"));

            var ctr3 = new zebra.layout.Constraints();

            var p1Spells = newPanel(); //new zebra.ui.Panel();

            p1Spells.setBorder(zebra.ui.borders.plain);
            p1Spells.setLayout(new zebra.layout.GridLayout(7, 1, zebra.layout.VERTICAL | zebra.layout.HORIZONTAL));



            var spell1 = new zebra.ui.Button("spell1");
            var spell1Tool = new zebra.ui.Label(" THIS IS just HONDA ");
            spell1Tool.setPadding(6);
            spell1Tool.setBackground("#E0F4FF");
            spell1.tooltip = spell1Tool;
            var spell2 = new zebra.ui.Button("spell2");
            var spell3 = new zebra.ui.Button("spell3");
            var spell4 = new zebra.ui.Button("spell4");
            var spell5 = new zebra.ui.Button("spell5");
            var spell6 = new zebra.ui.Button("spell6");
            var spell7 = new zebra.ui.Button("spell7");

            p1Spells.add(ctr3, spell1);
            p1Spells.add(ctr3, spell2);
            p1Spells.add(ctr3, spell3);
            p1Spells.add(ctr3, spell4);
            p1Spells.add(ctr3, spell5);
            p1Spells.add(ctr3, spell6);
            p1Spells.add(ctr3, spell7);


            pl.add(25, p1Spells);


            r.add(20, pl);

            var p = newPanel(); //new zebra.ui.Panel();
            p.setLayout(new zebra.layout.BorderLayout());
            p.add(zebra.layout.CENTER, new zebra.ui.Label("center"));
            r.add(60, p);

            r.add(20, new zebra.ui.Button("20%"));
        }



    });