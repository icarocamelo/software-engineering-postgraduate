package com.saudepluplus.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.saudepluplus.web.rest.TestUtil;

public class FisioterapeutaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fisioterapeuta.class);
        Fisioterapeuta fisioterapeuta1 = new Fisioterapeuta();
        fisioterapeuta1.setId(1L);
        Fisioterapeuta fisioterapeuta2 = new Fisioterapeuta();
        fisioterapeuta2.setId(fisioterapeuta1.getId());
        assertThat(fisioterapeuta1).isEqualTo(fisioterapeuta2);
        fisioterapeuta2.setId(2L);
        assertThat(fisioterapeuta1).isNotEqualTo(fisioterapeuta2);
        fisioterapeuta1.setId(null);
        assertThat(fisioterapeuta1).isNotEqualTo(fisioterapeuta2);
    }
}
