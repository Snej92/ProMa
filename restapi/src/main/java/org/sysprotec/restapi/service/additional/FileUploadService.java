package org.sysprotec.restapi.service.additional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.sysprotec.restapi.model.additional.Upload;
import org.sysprotec.restapi.model.project.Project;
import org.sysprotec.restapi.repository.ProjectRepository;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileUploadService {

    private String UPLOAD_DIR = "uploads/";
    private final ProjectRepository projectRepository;

    //types:
    //1: Project
    //2: Station

    public ResponseEntity<Upload> uploadProjectImage(MultipartFile file, Integer typ){

        checkingUploadTyp(typ);

        log.info("Uploading image to " + UPLOAD_DIR + file.getOriginalFilename());
        try {
            // Create the directory if it doesn't exist
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Save the file to the uploads directory
            String filePath = UPLOAD_DIR + file.getOriginalFilename();
            File dest = new File(filePath);

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, dest.toPath(), StandardCopyOption.REPLACE_EXISTING);
            }

            Upload newUpload = Upload.builder()
                    .fileName(file.getOriginalFilename())
                    .build();

            return new ResponseEntity<>(newUpload, HttpStatus.OK);

        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<Upload>> getUploadedImages(Integer typ){

        checkingUploadTyp(typ);

        File folder = new File(UPLOAD_DIR);
        File[] listOfFiles = folder.listFiles();

        if (listOfFiles == null) {
            return ResponseEntity.ok(new ArrayList<>());
        }

        List<Upload> uploads = new ArrayList<>();
        for (File file : listOfFiles) {
            if (file.isFile()) {
                Upload upload = Upload.builder()
                        .fileName(file.getName())
                        .build();
                uploads.add(upload);
            }
        }

        return new ResponseEntity<>(uploads, HttpStatus.OK);
    }

    public ResponseEntity<Resource> getImage(String filename, Integer typ){

        checkingUploadTyp(typ);

        try {
            File file = new File(UPLOAD_DIR + filename);
            if (file.exists()) {
                Path path = file.toPath();
                Resource resource = new UrlResource(path.toUri());

                // Guess content type, or default to application/octet-stream
                String contentType = Files.probeContentType(path);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    public ResponseEntity<String> deleteImage(String filename, Integer typ){

        checkingUploadTyp(typ);

        try {
            Path filePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
            File file = filePath.toFile();

            if (file.exists() && file.isFile()) {
                Files.delete(filePath);

                //Remove Image from Projects
                Optional<List<Project>> optionalProjectList = projectRepository.findProjectByImage(filename);
                if(optionalProjectList.isPresent()){
                    for(Project project : optionalProjectList.get()){
                        project.setImage("");
                        projectRepository.save(project);
                    }
                }

                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Datei nicht gefunden",HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Fehler beim Löschen aufgetreten",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public void checkingUploadTyp(Integer typ){
        switch(typ){
            case 1: UPLOAD_DIR = "uploads/project/";
                break;

            case 2: UPLOAD_DIR = "uploads/station/";
                break;

            default: log.error("Provided Upload typ is not configured!");
                break;
        }
    }
}
