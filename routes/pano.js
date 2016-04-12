/**
 * Created by edward on 2016/4/8.
 */
var express = require('express');
var router = express.Router();
var config = require('../config');
var obj = require('../module/module');


var xml_pre1 = '<krpano version="1.16" title="{title}" onstart="startup();">';
var xml_pre2 = '<include url="skin/vtourskin.xml" />\
    <skin_settings bingmaps="false"\
        bingmaps_key=""\
        bingmaps_zoombuttons="false"\
        gyro="true"\
        thumbs_width="120" thumbs_height="80" thumbs_padding="10" thumbs_crop="0|40|240|160"\
        thumbs_opened="false"\
        thumbs_text="false"\
        thumbs_dragging="true"\
        thumbs_onhoverscrolling="false"\
        thumbs_scrollbuttons="false"\
        thumbs_scrollindicator="false"\
        tooltips_thumbs="false"\
        tooltips_hotspots="false"\
        tooltips_mapspots="false"\
        controlbar_offset="20"\
    />\
    <layer name="skin_logo" url="" scale="0.25" opened_onclick="openurl(\'...\',_blank);" />\
    <action name="startup">\
        if(startscene === null, copy(startscene,scene[0].name));\
        loadscene(get(startscene), null, MERGE);\
    </action>';
var xml_scene1 = '<scene name="h{id}" title="{title}" onstart="" thumburl="{root_url}/thumb.jpg" lat="" lng="" heading="">';
var xml_scene2 = '<view hlookat="{hlookat}" vlookat="{vlookat}" fovtype="MFOV" fov="120" maxpixelzoom="2.0" fovmin="70" fovmax="140" limitview="auto" />';
var xml_scene3 = '<preview url="{root_url}/preview.jpg" />';
var xml_scene4 = '<image><cube url="{root_url}/pano_%s.jpg" /></image>';
var xml_scene5 = '<hotspot name="spot{idx}" style="skin_hotspotstyle" ath="{ath}" atv="{atv}" linkedscene="h{id}" />';
var xml_scene6 = '</scene>';
var xml_suf1 = '</krpano>';


// 酒店全景
router.get('/:id', function(req, res, next){
    var id = req.params.id;
    if(id <= 0){
        res.json({iRet: 0, info: 'invalid param'});
        next();
        return;
    }

    obj.getList('hotelHall', req, {hotel: id, pano: 1}).then(function(body){
        if(body.iRet === 1)  {
            var data = body.data;
            var xml_cont = xml_pre1.replace("{title}", data.hotel_name) + xml_pre2;
            if(data.data.length > 0){
                data.data.forEach(function(val){
                    var root_url = config.url.pano+'/store/h'+data.hotel_id+'/h'+val.id;
                    var temp = xml_scene1.replace("{id}", val.id);
                    temp = temp.replace("{title}", val.name);
                    temp = temp.replace("{root_url}", root_url);
                    xml_cont += temp;
                    var panoinfo = {'hlookat':0, 'vlookat': 0, linked: []};
                    if (val.pano_info) {
                        panoinfo = JSON.parse(val.pano_info);
                    }
                    temp = xml_scene2.replace("{hlookat}", panoinfo.hlookat);
                    temp = temp.replace("{vlookat}", panoinfo.vlookat);
                    xml_cont += temp;
                    xml_cont += xml_scene3.replace("{root_url}", root_url);
                    xml_cont += xml_scene4.replace("{root_url}", root_url);
                    panoinfo.linked.forEach(function(val2, key2){
                        var temp = xml_scene5.replace("{idx}", ""+val.id+"-"+key2);
                        temp = temp.replace("{ath}", val2.ath);
                        temp = temp.replace("{atv}", val2.atv);
                        temp = temp.replace("{id}", val2.id);
                        xml_cont += temp;
                    });
                    xml_cont += xml_scene6;
                });
            }
            xml_cont += xml_suf1;
            res.setHeader('content-type', 'text/xml');
            res.end(xml_cont);
        }
        else if(body.iRet === 0) {
            res.json({iRet: 0, info: 'failed', error: body.info});
        }
        else {
            res.sendStatus(500);
        }
    }, function(error) {
        console.log(error);
        res.sendStatus(500);
        next();
    });
});

module.exports = router;