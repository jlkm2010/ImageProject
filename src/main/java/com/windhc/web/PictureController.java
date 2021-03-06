package com.windhc.web;

import com.github.pagehelper.PageInfo;
import com.windhc.domain.Picture;
import com.windhc.service.PictureService;
import com.windhc.service.TagService;
import com.windhc.utils.PageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Administrator
 * @date 2015/9/5
 */
@RestController
@RequestMapping("/picture")
public class PictureController {

    @Autowired
    private PictureService pictureService;

    @Autowired
    private TagService tagService;

    @GetMapping(value = "/atlas/{atlasId}")
    public List<Picture> getPictureByAtlasId(@PathVariable long atlasId) {
        return pictureService.findPicturesByAtlasId(atlasId);
    }

    @GetMapping(value = "")
    public PageInfo<Picture> getAllPicture(PageRequest pageRequest) {
        return pictureService.findAll(pageRequest);
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable("id") long id){
        pictureService.delete(id);
    }
}
