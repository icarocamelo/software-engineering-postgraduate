package com.saudepluplus.domain;


import javax.persistence.*;

import java.io.Serializable;

import com.saudepluplus.domain.enumeration.TipoUnidadeSaude;

/**
 * A PostoDeSaude.
 */
@Entity
@Table(name = "posto_de_saude")
public class PostoDeSaude implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "c_npj")
    private String cNPJ;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "c_ep")
    private String cEP;

    @Column(name = "razao_social")
    private String razaoSocial;

    @Column(name = "nome_fantasia")
    private String nomeFantasia;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_unidade_saude")
    private TipoUnidadeSaude tipoUnidadeSaude;

    @OneToOne
    @JoinColumn(unique = true)
    private Endereco endereco;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getcNPJ() {
        return cNPJ;
    }

    public PostoDeSaude cNPJ(String cNPJ) {
        this.cNPJ = cNPJ;
        return this;
    }

    public void setcNPJ(String cNPJ) {
        this.cNPJ = cNPJ;
    }

    public String getTelefone() {
        return telefone;
    }

    public PostoDeSaude telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getcEP() {
        return cEP;
    }

    public PostoDeSaude cEP(String cEP) {
        this.cEP = cEP;
        return this;
    }

    public void setcEP(String cEP) {
        this.cEP = cEP;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public PostoDeSaude razaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
        return this;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public PostoDeSaude nomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
        return this;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public TipoUnidadeSaude getTipoUnidadeSaude() {
        return tipoUnidadeSaude;
    }

    public PostoDeSaude tipoUnidadeSaude(TipoUnidadeSaude tipoUnidadeSaude) {
        this.tipoUnidadeSaude = tipoUnidadeSaude;
        return this;
    }

    public void setTipoUnidadeSaude(TipoUnidadeSaude tipoUnidadeSaude) {
        this.tipoUnidadeSaude = tipoUnidadeSaude;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public PostoDeSaude endereco(Endereco endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PostoDeSaude)) {
            return false;
        }
        return id != null && id.equals(((PostoDeSaude) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PostoDeSaude{" +
            "id=" + getId() +
            ", cNPJ='" + getcNPJ() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", cEP='" + getcEP() + "'" +
            ", razaoSocial='" + getRazaoSocial() + "'" +
            ", nomeFantasia='" + getNomeFantasia() + "'" +
            ", tipoUnidadeSaude='" + getTipoUnidadeSaude() + "'" +
            "}";
    }
}
