package com.saudepluplus.web.rest;

import com.saudepluplus.domain.PostoDeSaude;
import com.saudepluplus.repository.PostoDeSaudeRepository;
import com.saudepluplus.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.saudepluplus.domain.PostoDeSaude}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PostoDeSaudeResource {

    private final Logger log = LoggerFactory.getLogger(PostoDeSaudeResource.class);

    private static final String ENTITY_NAME = "postoDeSaude";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PostoDeSaudeRepository postoDeSaudeRepository;

    public PostoDeSaudeResource(PostoDeSaudeRepository postoDeSaudeRepository) {
        this.postoDeSaudeRepository = postoDeSaudeRepository;
    }

    /**
     * {@code POST  /posto-de-saudes} : Create a new postoDeSaude.
     *
     * @param postoDeSaude the postoDeSaude to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new postoDeSaude, or with status {@code 400 (Bad Request)} if the postoDeSaude has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/posto-de-saudes")
    public ResponseEntity<PostoDeSaude> createPostoDeSaude(@RequestBody PostoDeSaude postoDeSaude) throws URISyntaxException {
        log.debug("REST request to save PostoDeSaude : {}", postoDeSaude);
        if (postoDeSaude.getId() != null) {
            throw new BadRequestAlertException("A new postoDeSaude cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PostoDeSaude result = postoDeSaudeRepository.save(postoDeSaude);
        return ResponseEntity.created(new URI("/api/posto-de-saudes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /posto-de-saudes} : Updates an existing postoDeSaude.
     *
     * @param postoDeSaude the postoDeSaude to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated postoDeSaude,
     * or with status {@code 400 (Bad Request)} if the postoDeSaude is not valid,
     * or with status {@code 500 (Internal Server Error)} if the postoDeSaude couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/posto-de-saudes")
    public ResponseEntity<PostoDeSaude> updatePostoDeSaude(@RequestBody PostoDeSaude postoDeSaude) throws URISyntaxException {
        log.debug("REST request to update PostoDeSaude : {}", postoDeSaude);
        if (postoDeSaude.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PostoDeSaude result = postoDeSaudeRepository.save(postoDeSaude);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, postoDeSaude.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /posto-de-saudes} : get all the postoDeSaudes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of postoDeSaudes in body.
     */
    @GetMapping("/posto-de-saudes")
    public List<PostoDeSaude> getAllPostoDeSaudes() {
        log.debug("REST request to get all PostoDeSaudes");
        return postoDeSaudeRepository.findAll();
    }

    /**
     * {@code GET  /posto-de-saudes/:id} : get the "id" postoDeSaude.
     *
     * @param id the id of the postoDeSaude to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the postoDeSaude, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/posto-de-saudes/{id}")
    public ResponseEntity<PostoDeSaude> getPostoDeSaude(@PathVariable Long id) {
        log.debug("REST request to get PostoDeSaude : {}", id);
        Optional<PostoDeSaude> postoDeSaude = postoDeSaudeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(postoDeSaude);
    }

    /**
     * {@code DELETE  /posto-de-saudes/:id} : delete the "id" postoDeSaude.
     *
     * @param id the id of the postoDeSaude to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/posto-de-saudes/{id}")
    public ResponseEntity<Void> deletePostoDeSaude(@PathVariable Long id) {
        log.debug("REST request to delete PostoDeSaude : {}", id);
        postoDeSaudeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
