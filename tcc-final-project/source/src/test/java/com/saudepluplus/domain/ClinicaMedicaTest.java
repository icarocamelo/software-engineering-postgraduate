package com.saudepluplus.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.saudepluplus.web.rest.TestUtil;

public class ClinicaMedicaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClinicaMedica.class);
        ClinicaMedica clinicaMedica1 = new ClinicaMedica();
        clinicaMedica1.setId(1L);
        ClinicaMedica clinicaMedica2 = new ClinicaMedica();
        clinicaMedica2.setId(clinicaMedica1.getId());
        assertThat(clinicaMedica1).isEqualTo(clinicaMedica2);
        clinicaMedica2.setId(2L);
        assertThat(clinicaMedica1).isNotEqualTo(clinicaMedica2);
        clinicaMedica1.setId(null);
        assertThat(clinicaMedica1).isNotEqualTo(clinicaMedica2);
    }
}
