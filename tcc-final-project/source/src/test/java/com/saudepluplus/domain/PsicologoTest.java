package com.saudepluplus.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.saudepluplus.web.rest.TestUtil;

public class PsicologoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Psicologo.class);
        Psicologo psicologo1 = new Psicologo();
        psicologo1.setId(1L);
        Psicologo psicologo2 = new Psicologo();
        psicologo2.setId(psicologo1.getId());
        assertThat(psicologo1).isEqualTo(psicologo2);
        psicologo2.setId(2L);
        assertThat(psicologo1).isNotEqualTo(psicologo2);
        psicologo1.setId(null);
        assertThat(psicologo1).isNotEqualTo(psicologo2);
    }
}
