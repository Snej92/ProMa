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

    @PostMapping("/image/{typ}")
    public ResponseEntity<Upload> uploadProjectImage(
            @RequestParam("file") MultipartFile file,
            @PathVariable Integer typ) {
        return fileUploadService.uploadProjectImage(file, typ);
    }

    @GetMapping("/image/{typ}")
    public ResponseEntity<List<Upload>> getUploadedImages(@PathVariable Integer typ) {
        return fileUploadService.getUploadedImages(typ);
    }

    @GetMapping(("image/{filename}/{typ}"))
    public ResponseEntity<Resource> getImage(
            @PathVariable String filename,
            @PathVariable Integer typ) {
        return fileUploadService.getImage(filename, typ);
    }

    @DeleteMapping("/image/{filename}/{typ}")
    public ResponseEntity<String> deleteImage(
            @PathVariable String filename,
            @PathVariable Integer typ) {
        return fileUploadService.deleteImage(filename, typ);
    }
}