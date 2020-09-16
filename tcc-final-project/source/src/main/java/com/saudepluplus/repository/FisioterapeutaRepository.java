package com.saudepluplus.repository;

import com.saudepluplus.domain.Fisioterapeuta;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Fisioterapeuta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FisioterapeutaRepository extends JpaRepository<Fisioterapeuta, Long> {
}
