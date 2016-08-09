/**
 * Created by edward on 2016/4/8.
 */
var express = require('express');
var router = express.Router();
var config = require('../config');
var obj = require('../module/module');
var token = require('../module/token');


var xml_pre1 = '<krpano version="1.19" title="{title}">';
var xml_pre2 = '<include url="skin/vtourskin.xml" />\
    <skin_settings maps="false"\
        maps_type="bing"\
        maps_bing_api_key=""\
        maps_zoombuttons="false"\
        gyro="true"\
        webvr="true"\
        littleplanetintro="false"\
        title="true"\
        thumbs="true"\
        thumbs_width="120" thumbs_height="80" thumbs_padding="10"\
        thumbs_crop="0|40|240|160"\
        thumbs_opened="false"\
        thumbs_text="false"\
        thumbs_dragging="true"\
        thumbs_onhoverscrolling="false"\
        thumbs_scrollbuttons="false"\
        thumbs_scrollindicator="false"\
        thumbs_loop="false"\
        tooltips_buttons="false"\
        tooltips_thumbs="false"\
        tooltips_hotspots="false"\
        tooltips_mapspots="false"\
        deeplinking="false"\
        loadscene_flags="MERGE"\
        loadscene_blend="OPENBLEND(0.5, 0.0, 0.75, 0.05, linear)"\
        loadscene_blend_prev="SLIDEBLEND(0.5, 180, 0.75, linear)"\
        loadscene_blend_next="SLIDEBLEND(0.5,   0, 0.75, linear)"\
        loadingtext="loading..."\
        layout_width="100%"\
        layout_maxwidth="814"\
        controlbar_width="-24"\
        controlbar_height="40"\
        controlbar_offset="20"\
        controlbar_offset_closed="-40"\
        controlbar_overlap.no-fractionalscaling="10"\
        controlbar_overlap.fractionalscaling="0"\
        design_skin_images="vtourskin.png"\
        design_bgcolor="0x2D3E50"\
        design_bgalpha="0.8"\
        design_bgborder="0"\
        design_bgroundedge="1"\
        design_bgshadow="0 4 10 0x000000 0.3"\
        design_thumbborder_bgborder="3 0xFFFFFF 1.0"\
        design_thumbborder_padding="2"\
        design_thumbborder_bgroundedge="0"\
        design_text_css="color:#FFFFFF; font-family:Arial;"\
        design_text_shadow="0"\
    />\
    <action name="startup" autorun="onstart">\
        if(startscene === null OR !scene[get(startscene)], copy(startscene,scene[0].name); );\
        loadscene(get(startscene), null, MERGE);\
        if(startactions !== null, startactions() );\
    </action>';

var xml_scene1 = '<scene name="h{id}" title="{title}" onstart="" thumburl="{root_url}/thumb.jpg!t1" lat="" lng="" heading="">';
var xml_scene2 = '<view hlookat="{hlookat}" vlookat="{vlookat}" fovtype="MFOV" fov="120" maxpixelzoom="2.0" fovmin="70" fovmax="140" limitview="auto" />';
var xml_scene3 = '<preview url="{root_url}/preview.jpg!t2" />';
var xml_scene4 = '<image><cube url="{root_url}/pano_%s.jpg!p2" /><cube url="{root_url}/pano_%s.jpg!p1" devices="mobile" /></image>';
var xml_scene5 = '<hotspot name="spot{idx}" style="skin_hotspotstyle" ath="{ath}" atv="{atv}" linkedscene="h{id}" />';
var xml_scene6 = '</scene>';
var xml_suf1 = '</krpano>';

router.get('/index.html', token.getUser, checkAuth, function(req, res, next){
    res.render('pano_index');
});

// 酒店全景
router.get('/:id', function(req, res, next){// , token.getUser, checkAuth
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
                    temp = xml_scene4.replace("{root_url}", root_url);
                    temp = temp.replace("{root_url}", root_url);
                    xml_cont += temp;
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

function checkAuth(req, res, next){
    if(!req.user.priv){
        res.redirect('http://account.halobear.com?url=http://open.halobear.com/pano/' + req.params.id);
    }else if(req.config.panoGroup.indexOf(req.user.priv.privs) == -1){
        res.send('抱歉，你没有查看酒店全景的权限');
    }else{
        next();
    }
}

module.exports = router;