package com.Protocol.Placement.controller;

import com.Protocol.Placement.entity.Skill;
import com.Protocol.Placement.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/skills")
@CrossOrigin
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Skill> createSkill(
            @RequestBody Skill skill) {

        return ResponseEntity.ok(
                skillService.createSkill(skill)
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<List<Skill>> getAllSkills() {

        return ResponseEntity.ok(
                skillService.getAllSkills()
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<Skill> getSkillById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                skillService.getSkillById(id)
        );
    }

    @GetMapping("/name/{name}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT')")
    public ResponseEntity<Skill> getSkillByName(
            @PathVariable String name) {

        return ResponseEntity.ok(
                skillService.getSkillByName(name)
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Skill> updateSkill(
            @PathVariable Long id,
            @RequestBody Skill skill) {

        return ResponseEntity.ok(
                skillService.updateSkill(id, skill)
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteSkill(
            @PathVariable Long id) {

        skillService.deleteSkill(id);

        return ResponseEntity.ok(
                "Skill deleted successfully"
        );
    }
}