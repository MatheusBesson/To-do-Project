package com.mathdev.to_do.controller;


import com.mathdev.to_do.DTO.ToDoRequestDTO;
import com.mathdev.to_do.DTO.ToDoResponseDTO;
import com.mathdev.to_do.model.ToDo;
import com.mathdev.to_do.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping("/to-do-list") // -------- finish endpoint
@CrossOrigin(origins = "*") // change this for frontend connection
public class ToDoController {

    @Autowired
    private ToDoRepository repository;

    @GetMapping
    public List<ToDoResponseDTO> findAll() {
        List<ToDoResponseDTO> toDoList = repository.findAll().stream().map(ToDoResponseDTO::new).toList();
        return toDoList;
    }

    @PostMapping
    public void saveToDo(@RequestBody ToDoRequestDTO toDoPostData) {
        ToDo toDoCreated = new ToDo(toDoPostData);
        repository.save(toDoCreated);
    }

    @PutMapping("/{id}")
    public void updateToDo(@RequestBody ToDoRequestDTO updateToDo, @PathVariable Long id) {
        LocalDateTime newDate = updateToDo.creationDate();

        // checking if this obejct already exists in DB
        ToDo existingToDo = repository.findById(id).orElseThrow(() -> new NullPointerException("This task doesn't exists"));

        existingToDo.setTitle(updateToDo.title());
        existingToDo.setDescription(updateToDo.description());
        existingToDo.setStatus(updateToDo.status());
        existingToDo.setCreationDate(newDate);

        repository.save(existingToDo);
    }

   @DeleteMapping("/{id}")
    public void deleteToDo(@PathVariable Long id) {
        ToDo ToDoForDelete = repository.findById(id)
                .orElseThrow(() -> new NullPointerException("ToDo does not exist."));

        repository.delete(ToDoForDelete);
   }
}
