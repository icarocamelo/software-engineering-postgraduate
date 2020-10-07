package com.saudepluplus.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Leito.
 */
@Entity
@Table(name = "leito")
public class Leito implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "identificacao")
    private String identificacao;

    @ManyToOne
    @JsonIgnoreProperties(value = "leitos", allowSetters = true)
    private Hospital hospital;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentificacao() {
        return identificacao;
    }

    public Leito identificacao(String identificacao) {
        this.identificacao = identificacao;
        return this;
    }

    public void setIdentificacao(String identificacao) {
        this.identificacao = identificacao;
    }

    public Hospital getHospital() {
        return hospital;
    }

    public Leito hospital(Hospital hospital) {
        this.hospital = hospital;
        return this;
    }

    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Leito)) {
            return false;
        }
        return id != null && id.equals(((Leito) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Leito{" +
            "id=" + getId() +
            ", identificacao='" + getIdentificacao() + "'" +
            "}";
    }
}
