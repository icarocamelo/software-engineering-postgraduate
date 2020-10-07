package com.saudepluplus.repository;

import com.saudepluplus.domain.Consulta;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Consulta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
}
