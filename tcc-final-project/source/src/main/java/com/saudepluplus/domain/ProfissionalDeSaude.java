package com.saudepluplus.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A ProfissionalDeSaude.
 */
@Entity
@Table(name = "profissional_de_saude")
public class ProfissionalDeSaude implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "numero_registro")
    private String numeroRegistro;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroRegistro() {
        return numeroRegistro;
    }

    public ProfissionalDeSaude numeroRegistro(String numeroRegistro) {
        this.numeroRegistro = numeroRegistro;
        return this;
    }

    public void setNumeroRegistro(String numeroRegistro) {
        this.numeroRegistro = numeroRegistro;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProfissionalDeSaude)) {
            return false;
        }
        return id != null && id.equals(((ProfissionalDeSaude) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProfissionalDeSaude{" +
            "id=" + getId() +
            ", numeroRegistro='" + getNumeroRegistro() + "'" +
            "}";
    }
}
