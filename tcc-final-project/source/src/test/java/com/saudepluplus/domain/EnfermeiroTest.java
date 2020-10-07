package com.saudepluplus.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.saudepluplus.web.rest.TestUtil;

public class EnfermeiroTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Enfermeiro.class);
        Enfermeiro enfermeiro1 = new Enfermeiro();
        enfermeiro1.setId(1L);
        Enfermeiro enfermeiro2 = new Enfermeiro();
        enfermeiro2.setId(enfermeiro1.getId());
        assertThat(enfermeiro1).isEqualTo(enfermeiro2);
        enfermeiro2.setId(2L);
        assertThat(enfermeiro1).isNotEqualTo(enfermeiro2);
        enfermeiro1.setId(null);
        assertThat(enfermeiro1).isNotEqualTo(enfermeiro2);
    }
}
