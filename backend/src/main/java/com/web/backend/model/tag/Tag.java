package com.web.backend.model.tag;

import com.web.backend.model.sns.Sns;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="tag_id")
    private Long tagId;

    @NotBlank
    @Column(name="content", nullable=false, length=20)
    private String content;

    @ManyToMany
    @JoinTable(
        name = "SNS_TAG",
        joinColumns = @JoinColumn(name = "tag_id"),
        inverseJoinColumns = @JoinColumn(name = "sns_id")
    )
    private List<Sns> sns = new ArrayList<>();


    @Builder
    public Tag(String content){
        this.content = content;
    }
}
