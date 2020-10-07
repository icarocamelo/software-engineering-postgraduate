package com.saudepluplus.repository;

import com.saudepluplus.domain.ClinicaMedica;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ClinicaMedica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClinicaMedicaRepository extends JpaRepository<ClinicaMedica, Long> {
}
