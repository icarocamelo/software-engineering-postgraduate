package com.saudepluplus.web.rest;

import com.saudepluplus.domain.Permissao;
import com.saudepluplus.repository.PermissaoRepository;
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
 * REST controller for managing {@link com.saudepluplus.domain.Permissao}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PermissaoResource {

    private final Logger log = LoggerFactory.getLogger(PermissaoResource.class);

    private static final String ENTITY_NAME = "permissao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PermissaoRepository permissaoRepository;

    public PermissaoResource(PermissaoRepository permissaoRepository) {
        this.permissaoRepository = permissaoRepository;
    }

    /**
     * {@code POST  /permissaos} : Create a new permissao.
     *
     * @param permissao the permissao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new permissao, or with status {@code 400 (Bad Request)} if the permissao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/permissaos")
    public ResponseEntity<Permissao> createPermissao(@RequestBody Permissao permissao) throws URISyntaxException {
        log.debug("REST request to save Permissao : {}", permissao);
        if (permissao.getId() != null) {
            throw new BadRequestAlertException("A new permissao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Permissao result = permissaoRepository.save(permissao);
        return ResponseEntity.created(new URI("/api/permissaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /permissaos} : Updates an existing permissao.
     *
     * @param permissao the permissao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated permissao,
     * or with status {@code 400 (Bad Request)} if the permissao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the permissao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/permissaos")
    public ResponseEntity<Permissao> updatePermissao(@RequestBody Permissao permissao) throws URISyntaxException {
        log.debug("REST request to update Permissao : {}", permissao);
        if (permissao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Permissao result = permissaoRepository.save(permissao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, permissao.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /permissaos} : get all the permissaos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of permissaos in body.
     */
    @GetMapping("/permissaos")
    public List<Permissao> getAllPermissaos() {
        log.debug("REST request to get all Permissaos");
        return permissaoRepository.findAll();
    }

    /**
     * {@code GET  /permissaos/:id} : get the "id" permissao.
     *
     * @param id the id of the permissao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the permissao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/permissaos/{id}")
    public ResponseEntity<Permissao> getPermissao(@PathVariable Long id) {
        log.debug("REST request to get Permissao : {}", id);
        Optional<Permissao> permissao = permissaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(permissao);
    }

    /**
     * {@code DELETE  /permissaos/:id} : delete the "id" permissao.
     *
     * @param id the id of the permissao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/permissaos/{id}")
    public ResponseEntity<Void> deletePermissao(@PathVariable Long id) {
        log.debug("REST request to delete Permissao : {}", id);
        permissaoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
