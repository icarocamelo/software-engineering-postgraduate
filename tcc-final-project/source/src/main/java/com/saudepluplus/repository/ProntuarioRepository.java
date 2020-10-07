package com.saudepluplus.repository;

import com.saudepluplus.domain.Prontuario;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Prontuario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProntuarioRepository extends JpaRepository<Prontuario, Long> {
}
