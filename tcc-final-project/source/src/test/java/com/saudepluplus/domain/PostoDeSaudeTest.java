package com.saudepluplus.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.saudepluplus.web.rest.TestUtil;

public class PostoDeSaudeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PostoDeSaude.class);
        PostoDeSaude postoDeSaude1 = new PostoDeSaude();
        postoDeSaude1.setId(1L);
        PostoDeSaude postoDeSaude2 = new PostoDeSaude();
        postoDeSaude2.setId(postoDeSaude1.getId());
        assertThat(postoDeSaude1).isEqualTo(postoDeSaude2);
        postoDeSaude2.setId(2L);
        assertThat(postoDeSaude1).isNotEqualTo(postoDeSaude2);
        postoDeSaude1.setId(null);
        assertThat(postoDeSaude1).isNotEqualTo(postoDeSaude2);
    }
}
