package com.hc.web;

import com.hc.domain.Atlas;
import com.hc.domain.Picture;
import com.hc.domain.Tag;
import com.hc.service.*;
import com.hc.utils.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2015/9/5.
 */
@RestController
@RequestMapping("/atlas")
public class AtlasController {

    @Autowired
    AtlasService atlasService;

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    public void delete(@PathVariable("id") long id){
        atlasService.delete(id);
    }

    @RequestMapping(value = "/detail/{id}", method = RequestMethod.GET)
    public Atlas datail(@PathVariable("id") long id){
        return atlasService.findOne(id);
    }

    @RequestMapping(value = "/tag/{atlasId}",method = RequestMethod.GET)
    public List<Tag> getAtlasTag(@PathVariable("atlasId") long atlasId){
        return atlasService.atlasTag(atlasId);
    }

    @Transactional
    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public Map save(@RequestBody Map<String,Object> params){
        atlasService.saveForForm(params);
        return CommonUtil.response(true, "添加成功！");
    }

    @RequestMapping(value = "/atlasPage", method = RequestMethod.GET)
    public Page<Atlas> getAllPicture(@RequestParam() Map pageParams) {

        PageRequest pageRequest = CommonUtil.buildPageRequest(pageParams);
        String filterValue = (String) pageParams.get("filter[atlas]");
        if (filterValue!=null){
            return atlasService.findByAtlasName("%" + filterValue + "%", pageRequest);
        }
        return atlasService.findAll(pageRequest);
    }

    @Transactional
    @RequestMapping(value = "/update",method = RequestMethod.POST)
    public Map update(@RequestBody Map<String,Object> params) {

        atlasService.updateForForm(params);
        return CommonUtil.response(true, "修改成功！");
    }

}