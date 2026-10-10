
        package com.Protocol.Placement.service;

import com.Protocol.Placement.entity.Skill;
import com.Protocol.Placement.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public Skill createSkill(Skill skill) {

        if (skill.getName() == null || skill.getName().trim().isEmpty()) {
            throw new RuntimeException("Skill name is required");
        }

        skill.setName(skill.getName().trim());

        if (skillRepository.existsByNameIgnoreCase(skill.getName())) {
            throw new RuntimeException("Skill already exists");
        }

        return skillRepository.save(skill);
    }

    public Skill getSkillById(Long id) {

        return skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found"));
    }

    public Skill getSkillByName(String name) {

        return skillRepository.findByNameIgnoreCase(name)
                .orElseThrow(() -> new RuntimeException("Skill not found"));
    }

    public List<Skill> getAllSkills() {

        return skillRepository.findAll();
    }

    public Skill updateSkill(Long id, Skill updatedSkill) {

        Skill existingSkill = getSkillById(id);

        if (updatedSkill.getName() == null
                || updatedSkill.getName().trim().isEmpty()) {

            throw new RuntimeException("Skill name is required");
        }

        String newName = updatedSkill.getName().trim();

        if (!existingSkill.getName().equalsIgnoreCase(newName)
                && skillRepository.existsByNameIgnoreCase(newName)) {

            throw new RuntimeException("Skill already exists");
        }

        existingSkill.setName(newName);

        return skillRepository.save(existingSkill);
    }

    public void deleteSkill(Long id) {

        Skill skill = getSkillById(id);

        skillRepository.delete(skill);
    }
}

