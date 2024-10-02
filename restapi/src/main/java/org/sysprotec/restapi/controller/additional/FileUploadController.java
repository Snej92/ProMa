package org.sysprotec.restapi.controller.additional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.sysprotec.restapi.model.additional.Upload;
import org.sysprotec.restapi.service.additional.FileUploadService;
import java.util.List;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
@Slf4j
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @PostMapping("/image")
    public ResponseEntity<Upload> uploadImage(
            @RequestParam("file") MultipartFile file) {
        return fileUploadService.uploadImage(file);
    }

    @GetMapping("/image")
    public ResponseEntity<List<Upload>> getUploadedImages() {
        return fileUploadService.getUploadedImages();
    }

    @GetMapping(("image/{filename}"))
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        return fileUploadService.getImage(filename);
    }

    @DeleteMapping("/image/{filename}")
    public ResponseEntity<String> deleteImage(@PathVariable String filename) {
        return fileUploadService.deleteImage(filename);
    }
}