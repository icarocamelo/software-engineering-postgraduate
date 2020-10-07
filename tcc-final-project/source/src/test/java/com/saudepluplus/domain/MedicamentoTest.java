package com.saudepluplus.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.saudepluplus.web.rest.TestUtil;

public class MedicamentoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Medicamento.class);
        Medicamento medicamento1 = new Medicamento();
        medicamento1.setId(1L);
        Medicamento medicamento2 = new Medicamento();
        medicamento2.setId(medicamento1.getId());
        assertThat(medicamento1).isEqualTo(medicamento2);
        medicamento2.setId(2L);
        assertThat(medicamento1).isNotEqualTo(medicamento2);
        medicamento1.setId(null);
        assertThat(medicamento1).isNotEqualTo(medicamento2);
    }
}
