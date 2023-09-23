/**
 * Title        : Forumotion tools for moderation
 * Version      : 1.0.2
 * Author        : Zeus
 * Author URI    : http://help.forumgratuit.ro
 * License      : GNU - General Public License v3.0
 * Documentation : https://github.com/zeusmaximus/Moderation-tools-for-Forumotion/
 */
if (typeof zModConfig === 'undefined') var zModConfig = [{
    icon: "https://i58.servimg.com/u/f58/11/80/17/98/chat-110.png",
    loadCss: true, // true or false
    css_source: "https://cdn.rawgit.com/zeusmaximus/Moderation-tools-for-Forumotion/e46f560/style.css",
    fontAwesome: true // true or false
}];
 
if (typeof zModTabels === 'undefined') var zModTabels = [{
        type: "zalert",
        body_start: '[table class="zmod_box zalert"][tr][td style="padding-right: 10px;" width="60px;"][icon="fa fa-exclamation-circle"][/icon][div]',
        body_end: "[/div][/td][/tr][/table]\n\n"
    },
    {
        type: "zsuccess",
        body_start: '[table class="zmod_box zsuccess"][tr][td style="padding-right: 10px;" width="60px;"][icon="fa fa-check"][/icon][div]',
        body_end: "[/div][/td][/tr][/table]\n\n"
    },
    {
        type: "zdefault",
        body_start: '[table class="zmod_box zdefault"][tr][td style="padding-right: 10px;" width="60px;"][icon="fa fa-rocket"][/icon][div]',
        body_end: "[/div][/td][/tr][/table]\n\n"
    },
    {
        type: "zwarning",
        body_start: '[table class="zmod_box zwarning"][tr][td style="padding-right: 10px;" width="60px;"][icon="fa fa-exclamation-triangle"][/icon][div]',
        body_end: "[/div][/td][/tr][/table]\n\n"
    },
    {
        type: "zinfo",
        body_start: '[table class="zmod_box zinfo"][tr][td style="padding-right: 10px;" width="60px;"][icon="fa fa-info"][/icon][div]',
        body_end: "[/div][/td][/tr][/table]\n\n"
    }
];
 
if (typeof zModMessages === 'undefined') var zModMessages = [{
        name: "Alert example",
        message: '[b]Alert[/b] \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        group_id: 0,
        type: "zalert"
    },
    {
        name: "Success example",
        message: '[b]Success[/b] \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        group_id: 0,
        type: "zsuccess"
    },
    {
        name: "Default example",
        message: '[b]Default[/b] \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        group_id: 1,
        type: "zdefault"
    },
    {
        name: "Warning example",
        message: '[b]Warning[/b] \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        group_id: 1,
        type: "zwarning"
    },
    {
        name: "Info example",
        message: '[b]Info[/b] \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        group_id: 1,
        type: "zinfo"
    },
 
];
 
if (typeof zModGroups === 'undefined') var zModGroups = [{
        id: 0,
        name: 'Administrators'
    },
    {
        id: 1,
        name: 'Moderators'
    }
];
 
$(function() {
 
    if (zModConfig[0].fontAwesome === true) $('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />').appendTo("head");
 
    if (zModConfig[0].loadCss === true) $('<link rel="stylesheet" type="text/css" href="'+ zModConfig[0].css_source +'" />').appendTo("head");
 
    $('<style type="text/css">.sceditor-button-staff div {background: url(' + zModConfig[0].icon + ') !important;}</style>').appendTo("head");
 
    var list = "";
 
    $('.zmod_box td').each(function() {
        this.innerHTML = this.innerHTML.replace(/\[icon\="?(.*?)"?\](.*?)\[\/icon\]/g, "<div><i class=\"$1\ icon-message\">$2</i></div>")
            .replace(/\[div\](.*?)\[\/div\]/g, "<div>$1</div>");
    });
 
    $(window).load(function() {
        function zModGetTable(type, body) {
            var str = "";
            for (var y = 0; y < zModTabels.length; y++) str += (zModTabels[y].type === type) ? (body === "start") ? zModTabels[y].body_start : zModTabels[y].body_end : "";
            return str;
        }
 
        function zModGetModMessageByGroupId(f, g) {
            var str = "",
                c = 0;
            for (var z = 0; z < zModMessages.length; z++) {
                if (zModMessages[z].group_id == f) {
                    str += "<li class='mod_editor_message group_" + zModMessages[z].group_id + "' id='group_" + z + "_" + zModMessages[z].group_id + "'><a style='cursor: pointer'>" + zModMessages[z].name + "</a></li>\n";
                    if (g === 0) zModInsertToSCEditor('#group_' + z + '_' + zModMessages[z].group_id + ' a', zModMessages[z].message, zModMessages[z].type);
                    c++;
                }
            }
            if (g === 1) str = c;
 
            return str;
        }
 
        function zModInsertToSCEditor(e, t, i) {
            $(e).live("click", function(e) {
                $("#text_editor_textarea").sceditor("instance").insertText(zModGetTable(i, "start") + t, zModGetTable(i, "end"));
            });
        }
 
        function zModToggleSCEditor(o, i) {
            $(o).live("click", function(o) {
                $(i).toggle();
            });
        }
 
        for (var x = 0; x < zModGroups.length; x++) {
            if (zModGetModMessageByGroupId(zModGroups[x].id, 1) > 0) {
                list += "<li class='mod_editor_section' id='list_" + zModGroups[x].id + "'><a style='cursor: pointer'>" + zModGroups[x].name + " (" + zModGetModMessageByGroupId(zModGroups[x].id, 1) + ")</a></li>" + zModGetModMessageByGroupId(zModGroups[x].id, 0);
                zModToggleSCEditor("#list_" + zModGroups[x].id + " a", ".group_" + zModGroups[x].id + "");
            }
        }
 
        zModToggleSCEditor('.sceditor-button.sceditor-button-staff', '.mod_box');
 
        $("textarea, .sceditor-button").click(function() {
            $(".mod_box").hide();
        });
 
        $(".sceditor-button-source").click(function() {
            $(".sceditor-button-staff").removeClass("disabled");
        });
 
        if(_userdata.user_level > 0) $(".sceditor-group:last-child").before('<div class="sceditor-group"><a class="sceditor-button sceditor-button-staff" title="Mesaje de moderare"><div unselectable="on">Mesaje de moderare</div></a><div class="mod_box" style="display: none;"><ul class="mod_groups" id="mod_box_i">' + list + '<li class="copyright_e"> © Created by Zeus - All right reserved</li></div></div></div>');
       
    });
 
});
