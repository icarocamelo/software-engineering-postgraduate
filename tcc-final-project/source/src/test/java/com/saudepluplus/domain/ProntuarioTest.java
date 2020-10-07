package com.saudepluplus.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.saudepluplus.web.rest.TestUtil;

public class ProntuarioTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Prontuario.class);
        Prontuario prontuario1 = new Prontuario();
        prontuario1.setId(1L);
        Prontuario prontuario2 = new Prontuario();
        prontuario2.setId(prontuario1.getId());
        assertThat(prontuario1).isEqualTo(prontuario2);
        prontuario2.setId(2L);
        assertThat(prontuario1).isNotEqualTo(prontuario2);
        prontuario1.setId(null);
        assertThat(prontuario1).isNotEqualTo(prontuario2);
    }
}
