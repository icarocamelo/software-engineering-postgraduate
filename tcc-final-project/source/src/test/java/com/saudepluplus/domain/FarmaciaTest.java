package com.saudepluplus.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.saudepluplus.web.rest.TestUtil;

public class FarmaciaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Farmacia.class);
        Farmacia farmacia1 = new Farmacia();
        farmacia1.setId(1L);
        Farmacia farmacia2 = new Farmacia();
        farmacia2.setId(farmacia1.getId());
        assertThat(farmacia1).isEqualTo(farmacia2);
        farmacia2.setId(2L);
        assertThat(farmacia1).isNotEqualTo(farmacia2);
        farmacia1.setId(null);
        assertThat(farmacia1).isNotEqualTo(farmacia2);
    }
}
